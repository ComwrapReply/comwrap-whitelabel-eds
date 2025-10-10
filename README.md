# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on [www.aem.live](https://www.aem.live/docs/) and [experienceleague.adobe.com](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/authoring), more specifically:
1. [Getting Started](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/edge-dev-getting-started), [Creating Blocks](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/create-block), [Content Modelling](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

Furthremore, we encourage you to watch the recordings of any of our previous presentations or sessions:
- [Getting started with AEM Authoring and Edge Delivery Services](https://experienceleague.adobe.com/en/docs/events/experience-manager-gems-recordings/gems2024/aem-authoring-and-edge-delivery)

## Prerequisites

- nodejs 18.3.x or newer
- AEM Cloud Service release 2024.8 or newer (>= `17465`)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on [www.aem.live](https://www.aem.live/docs/) and [experienceleague.adobe.com](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/authoring), more specifically:
1. [Getting Started](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/edge-dev-getting-started), [Creating Blocks](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/create-block), [Content Modelling](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

Furthremore, we encourage you to watch the recordings of any of our previous presentations or sessions:
- [Getting started with AEM Authoring and Edge Delivery Services](https://experienceleague.adobe.com/en/docs/events/experience-manager-gems-recordings/gems2024/aem-authoring-and-edge-delivery)

## Prerequisites

- nodejs 18.3.x or newer
- AEM Cloud Service release 2024.8 or newer (>= `17465`)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Branch naming policy and Jira integration

### Branch naming standard (enforced)

Branches must follow this pattern:

```
<type>-<JIRAKEY>-<number>[-optional-kebab-title]
```



- Allowed types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `revert`
- Examples:
  - `feat-EDGE-80-github-setup`
  - `fix-EDGE-123-hotfix`
  - `chore-EDGE-2`

Validation layers:
- Local pre-push hook (Husky) blocks pushes of wrongly named branches
- GitHub Action `.github/workflows/branch-name.yml` blocks PRs with invalid branch names

Notes:
- Protected branches `main`, `master`, `develop` are exempt from the local check
- Husky hooks are installed by `npm install` (via the `prepare` script). If hooks are not running, execute `npm run prepare`.

### Commit messages and PRs: reference Jira keys

To link activity to Jira, include one or more Jira issue keys (e.g. `EDGE-80`) in:
- commit messages, and/or
- PR titles/descriptions

Example commit message:
```
feat: EDGE-80 Add branch name policy workflow
```

### Automatic Jira comments (on every push)

Workflow: `.github/workflows/jira-comment.yml`

What it does:
- Detects Jira keys in pushed commits
- Posts a single Jira comment per issue with:
  - the commit message (auto-converts any URLs into clickable links)
  - a link to the GitHub commit
  - a link to the PR if `#<number>` is mentioned
  - a “Demo Page” link if the commit message contains `demo:`, `preview:` or `live:` followed by a URL

Project secrets required (GitHub → Settings → Secrets and variables → Actions):
- `JIRA_BASE_URL` (e.g. `https://your-company.atlassian.net`)
- `JIRA_EMAIL` (Jira user email)
- `JIRA_API_TOKEN` (API token for the above user)

Troubleshooting:
- If comments aren’t posted, verify the three secrets above
- Ensure commit messages include a valid Jira key like `EDGE-80`
- Check the workflow run logs under “Actions → Comment commits to Jira”

### Run linters and auto-fix

- JS + CSS: `npm run lint:fix`
- JS only (auto-fix): `npm run lint:js -- --fix`
- CSS only (auto-fix): `npm run lint:css -- --fix`


## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

