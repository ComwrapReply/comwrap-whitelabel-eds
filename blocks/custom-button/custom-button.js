import { setBlockItemOptions, moveClassToTargetedChild } from '../../scripts/utils.js';
import { renderButton } from '../../components/button/button.js';

export default function decorate(block) {
  const blockItemsOptions = [];
  const blockItemMap = [{ name: 'link' }, { name: 'label' }, { name: 'target' }];

  setBlockItemOptions(block, blockItemMap, blockItemsOptions);
  const { link, label, target } = blockItemsOptions[0];

  const button = renderButton({
    link,
    label,
    target,
    block,
  });

  block.textContent = '';
  block.appendChild(button);
  moveClassToTargetedChild(block, button);
}
