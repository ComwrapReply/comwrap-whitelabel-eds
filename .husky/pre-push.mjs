import { exec } from "node:child_process";

const run = (cmd) => new Promise((resolve, reject) => exec(
  cmd,
  (error, stdout) => {
    if (error) reject(error);
    else resolve(stdout.trim());
  }
));

// Get current branch name
const getCurrentBranch = async () => {
  try {
    const branch = await run('git rev-parse --abbrev-ref HEAD');
    return branch;
  } catch (error) {
    console.error('Error getting current branch:', error.message);
    process.exit(1);
  }
};

// Validate branch name against the same regex as the GitHub workflow
const validateBranchName = (branchName) => {
  // Skip validation for main/master/develop branches
  const protectedBranches = ['main', 'master', 'develop'];
  if (protectedBranches.includes(branchName)) {
    return true;
  }

  // Same regex as in branch-name.yml
  const regex = /^(feat|fix|chore|docs|refactor|test|perf|build|ci|revert)-[A-Z]+-[0-9]+(-[a-z0-9]+)*$/;
  return regex.test(branchName);
};

// Main execution
const main = async () => {
  try {
    const currentBranch = await getCurrentBranch();
    
    console.log(`Validating branch name: ${currentBranch}`);
    
    if (!validateBranchName(currentBranch)) {
      console.error('\n❌ Invalid branch name!');
      console.error(`Branch: ${currentBranch}`);
      console.error('\n📋 Expected format: <type>-<TICKET>-<number>[-optional-kebab-title]');
      console.error('📋 Valid types: feat, fix, chore, docs, refactor, test, perf, build, ci, revert');
      console.error('📋 Example: feat-EDGE-80-github-setup');
      console.error('\n💡 To rename your branch:');
      console.error(`   git branch -m ${currentBranch} <new-valid-name>`);
      console.error('\n🚫 Push cancelled to prevent pull request validation failure.');
      process.exit(1);
    }
    
    console.log('✅ Branch name is valid!');
  } catch (error) {
    console.error('Error during branch validation:', error.message);
    process.exit(1);
  }
};

main();
