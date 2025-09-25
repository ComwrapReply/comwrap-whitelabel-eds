export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  const rows = [...block.children];

  block.classList.add(`facts-figures-cards-${cols.length}-cols`);
  block.classList.add(`facts-figures-cards-${rows.length}-rows`);

  rows.forEach((row) => {
    row.classList.add('facts-figures-cards-row');
  });

  cols.forEach((col) => {
    col.classList.add('facts-figures-cards-col');
  });

  // setup image columns
  [...rows].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('facts-figures-cards-img-col');
        }
      }
    });
  });
}
