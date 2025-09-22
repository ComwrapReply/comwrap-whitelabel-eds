import { fetchPlaceholders, createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function updateActiveSlide(slide) {
  const block = slide.closest('.carousel');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-slide');
  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  const indicators = block.querySelectorAll('.carousel-slide-indicator');
  indicators.forEach((indicator, idx) => {
    if (idx !== slideIndex) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-slide');
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
  if (slideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];

  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-slide-indicators');
  if (!slideIndicators) return;

  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const slideIndicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
    });
  });

  block.querySelector('.slide-prev').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });
  block.querySelector('.slide-next').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) updateActiveSlide(entry.target);
    });
  }, { threshold: 0.5 });
  block.querySelectorAll('.carousel-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });
}

function createSlide(row, slideIndex, carouselId) {
  // Check if there's an image in the row
  const hasImage = row.querySelector('picture') !== null;
  if (!hasImage) {
    // If no image, just return the content directly
    const content = document.createElement('div');
    content.classList.add('carousel-content');
    moveInstrumentation(row, content);

    [...row.children].forEach((div) => {
      const divClone = div.cloneNode(true);
      content.append(divClone);
    });

    // Handle carit items
    const caritItems = row.querySelectorAll('.carit');
    caritItems.forEach((carit) => {
      const caritClone = carit.cloneNode(true);
      content.append(caritClone);
    });

    // Handle card items
    const cardItems = row.querySelectorAll('.card');
    cardItems.forEach((card) => {
      const cardClone = card.cloneNode(true);
      content.append(cardClone);
    });

    return content;
  }

  // If there is an image, create a carousel slide
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('carousel-slide');

  // Move instrumentation before processing
  moveInstrumentation(row, slide);

  let slideLink = null;
  const firstLink = row.querySelector('a');
  if (firstLink) {
    slideLink = document.createElement('a');
    slideLink.href = firstLink.href;
  }

  // Process each div in the row
  [...row.children].forEach((div) => {
    const divClone = div.cloneNode(true);
    if (divClone.children.length === 1 && divClone.querySelector('picture')) {
      divClone.className = 'carousel-slide-image';
    } else {
      divClone.className = 'carousel-slide-content';
      // Add buttons if they exist
      const primaryButtonText = row.querySelector('.primary_button_text');
      const primaryButtonLink = row.querySelector('.primary_button_link');
      const secondaryButtonText = row.querySelector('.secondary_button_text');
      const secondaryButtonLink = row.querySelector('.secondary_button_link');

      if ((primaryButtonText && primaryButtonLink)
        || (secondaryButtonText && secondaryButtonLink)) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'carousel-buttons';

        if (primaryButtonText && primaryButtonLink) {
          const primaryButton = document.createElement('a');
          primaryButton.href = primaryButtonLink.textContent;
          primaryButton.textContent = primaryButtonText.textContent;
          primaryButton.className = 'button primary';
          buttonsContainer.appendChild(primaryButton);
        }

        if (secondaryButtonText && secondaryButtonLink) {
          const secondaryButton = document.createElement('a');
          secondaryButton.href = secondaryButtonLink.textContent;
          secondaryButton.textContent = secondaryButtonText.textContent;
          secondaryButton.className = 'button secondary';
          buttonsContainer.appendChild(secondaryButton);
        }

        divClone.appendChild(buttonsContainer);
      }

      const hasTextContent = divClone.textContent.trim() !== '';
      const hasButtons = divClone.querySelector('.carousel-buttons') !== null;

      if (!hasTextContent && !hasButtons) {
        return;
      }
    }
    if (divClone.querySelector('a')) {
      const link = divClone.querySelector('a');
      link.remove();
    }
    slide.append(divClone);
  });

  // Handle carit items
  const caritItems = row.querySelectorAll('.carit');
  caritItems.forEach((carit) => {
    const caritClone = carit.cloneNode(true);
    slide.append(caritClone);
  });

  // Handle card items
  const cardItems = row.querySelectorAll('.card');
  cardItems.forEach((card) => {
    const cardClone = card.cloneNode(true);
    slide.append(cardClone);
  });

  if (slideLink) {
    slideLink.append(slide);
    return slideLink;
  }
  return slide;
}

let carouselId = 0;
export default async function decorate(block) {
  carouselId += 1;
  block.setAttribute('id', `carousel-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div');
  // Count slides with images
  const slidesWithImages = [...rows].filter((row) => row.querySelector('picture'));
  const isSingleSlide = slidesWithImages.length < 2;

  const placeholders = await fetchPlaceholders();

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

  const container = document.createElement('div');
  container.classList.add('carousel-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-slides');
  block.prepend(slidesWrapper);

  let slideIndicators;
  let slideIndex = 0;
  if (!isSingleSlide) {
    const slideIndicatorsNav = document.createElement('nav');
    slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('carousel-slide-indicators');
    slideIndicatorsNav.append(slideIndicators);
    block.append(slideIndicatorsNav);

    const slideNavButtons = document.createElement('div');
    slideNavButtons.classList.add('carousel-navigation-buttons');
    slideNavButtons.innerHTML = `
      <button type="button" class="slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
      <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
    `;

    container.append(slideNavButtons);
  }

  // Process each row
  rows.forEach((row) => {
    const element = createSlide(row, slideIndex, carouselId);
    if (element.classList.contains('carousel-slide')) {
      // If it's a slide, add it to the slides wrapper
      slidesWrapper.append(element);
      if (slideIndicators) {
        const indicator = document.createElement('li');
        indicator.classList.add('carousel-slide-indicator');
        indicator.dataset.targetSlide = slideIndex;
        indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${slideIndex + 1} ${placeholders.of || 'of'} ${slidesWithImages.length}"></button>`;
        slideIndicators.append(indicator);
      }
      slideIndex += 1;
    } else {
      // If it's not a slide, add it directly to the block
      block.append(element);
    }
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Clean up original rows
  rows.forEach((row) => row.remove());

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    bindEvents(block);
  }
}
