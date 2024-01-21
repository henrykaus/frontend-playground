const cards = document.getElementsByClassName('card')
const container = document.getElementById('container')
const cardWidth = Array.from(cards)[0].getBoundingClientRect().width;

// Functions
const getScale = (position, halfwayPoint) => {
  const difference = Math.min(Math.abs(position - halfwayPoint), halfwayPoint);
  const scale = ((halfwayPoint - difference) / halfwayPoint) / 2 + 1;
  return scale;
}

const getZIndex = (position, halfwayPoint) => {
  const difference = Math.abs(position - halfwayPoint);
  const rangeOfValues = 0.20 * (halfwayPoint * 2);
  if (position > halfwayPoint - cardWidth / 2 && position < halfwayPoint + cardWidth / 2) {
    return 3;
  } else if (difference > halfwayPoint - rangeOfValues) {
    return 1;
  } else {
    return 2;
  }
}

const repositionCards = () => {
  const halfwayPoint = window.innerWidth / 2;

  const cardArr = Array.from(cards);
  cardArr.forEach(card => {
    const rectangle = card.getBoundingClientRect();
    const position = rectangle.left + rectangle.width / 2;
    card.style.scale = getScale(position, halfwayPoint);
    card.style.zIndex = getZIndex(position, halfwayPoint);
  });
}

const resizeContainer = () => {
  const halfwayPoint = window.innerWidth / 2;
  container.style.paddingLeft = `${halfwayPoint - cardWidth/2}px`;
  container.style.paddingRight = `${halfwayPoint - cardWidth/2}px`;
}


// Initial State
resizeContainer();
repositionCards();

// Listeners
window.addEventListener('resize', () => {
  resizeContainer();
  repositionCards();
});
container.addEventListener('scroll', repositionCards);
