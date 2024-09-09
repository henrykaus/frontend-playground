const links = document.querySelectorAll('li');
const sections = document.querySelectorAll('section');
const articles = document.querySelectorAll('article');

const linkArr = Array.from(links);
const sectionArr = Array.from(sections);
const articleArr = Array.from(articles);

// Functions
const makeSectionVisible = (event, index) => {
  linkArr[index].ariaExpanded = true;

  sectionArr[index].style.height = '400px';
  sectionArr[index].style.padding = '3em 5em';

  articleArr[index].classList.remove('fade-out');
  articleArr[index].style.opacity = '1';
}

const hideSection = (event, index) => {
  linkArr[index].ariaExpanded = false;

  sectionArr[index].style.height = '0';
  sectionArr[index].style.padding = '0';

  articleArr[index].classList.add('fade-out');
  articleArr[index].style.opacity = '0';
}

// Add event listeners
linkArr.forEach((link, index) => {
  link.addEventListener('mouseenter', (event) => makeSectionVisible(event, index));
  link.addEventListener('focusin', (event) => makeSectionVisible(event, index));

  link.addEventListener('mouseleave', (event) => hideSection(event, index));
  link.addEventListener('focusout', (event) => hideSection(event, index));
});
