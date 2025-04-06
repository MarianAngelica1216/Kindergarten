const carousel = document.querySelector('.carousel');
const cardWrappers = Array.from(document.querySelectorAll('.card-wrapper'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalCards = cardWrappers.length;

function startGame(targetPage) {
  sessionStorage.setItem("userInteracted", "true");
  window.location.href = targetPage;
}

function updateCarousel() {
  cardWrappers.forEach((cardWrapper, i) => {
    let offset = i - currentIndex;

    if (offset > Math.floor(totalCards / 2)) {
      offset -= totalCards;
    } else if (offset < -Math.floor(totalCards / 2)) {
      offset += totalCards;
    }

    // Hide card wrappers outside the visible range of 5
    if (Math.abs(offset) > 2) {
      cardWrapper.style.display = "none"; // Fully hide the card wrapper
    } else {
      cardWrapper.style.display = "block"; // Show the card wrapper
    }

    const scale = 1 - Math.abs(offset) * 0.15;
    const translateX = offset * 300 + Math.sign(offset) * 50;

    cardWrapper.style.zIndex = totalCards - Math.abs(offset);
    
    cardWrapper.style.transform = `
      translateX(${translateX}px)
      scale(${scale})
    `;

    // Update classes based on card wrapper position
    if (offset === 0) {
      cardWrapper.classList.add('in-focus');
      cardWrapper.classList.remove('out-of-focus', 'near-focus');
    } else if (Math.abs(offset) === 1) {
      cardWrapper.classList.add('near-focus');
      cardWrapper.classList.remove('in-focus', 'out-of-focus');
    } else {
      cardWrapper.classList.add('out-of-focus');
      cardWrapper.classList.remove('in-focus', 'near-focus');
    }
  });
}

// Only allow clicking in-focus and near-focus cards
cardWrappers.forEach((cardWrapper, i) => {
  cardWrapper.addEventListener('click', () => {
    if (cardWrapper.classList.contains('in-focus')) {
      // Main action when the center card is clicked
      console.log('In-focus card clicked');
      // startGame('yourTargetPage.html');
    } else if (cardWrapper.classList.contains('near-focus')) {
      // Move carousel to this card
      currentIndex = i;
      updateCarousel();
    }
    // Do nothing if out-of-focus
  });
});

function goNext() {
  currentIndex = (currentIndex + 1) % totalCards;
  updateCarousel();
}

function goPrev() {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateCarousel();
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

// Add mouse wheel event listener to the carousel container
carousel.addEventListener('wheel', (event) => {
  event.preventDefault(); // Prevent default scrolling behavior

  if (event.deltaY > 0) {
    goNext();
  } else if (event.deltaY < 0) {
    goPrev();
  }
});

updateCarousel();
