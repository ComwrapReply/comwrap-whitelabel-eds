export function renderButton({
  link, label, target, block,
}) {
  const button = document.createElement('a');
  button.className = 'button';
  button.title = label;
  if (target !== '') button.target = target;
  button.innerText = label;

  let href = link;
  block.classList.forEach((className) => {
    if (className === 'telephone') href = `tel:${link}`;
    if (className === 'email') href = `mailto:${link}`;
    if (className === 'download') button.download = '';
  });

  button.href = href;

  return button;
}

export default renderButton;
