const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const searchInput = document.getElementById('siteSearch');
const categoryCards = [...document.querySelectorAll('.category-card')];
const searchEmpty = document.getElementById('searchEmpty');

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('ru');
  let visibleCount = 0;
  categoryCards.forEach((card) => {
    const haystack = `${card.dataset.search || ''} ${card.textContent}`.toLocaleLowerCase('ru');
    const visible = !query || haystack.includes(query);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  if (searchEmpty) searchEmpty.hidden = visibleCount > 0;
});

// Keep remote photos from leaving broken image boxes if a source becomes unavailable.
document.querySelectorAll('img').forEach((image) => {
  image.addEventListener('error', () => {
    image.classList.add('image-unavailable');
    image.alt = 'Иллюстративное фото временно недоступно';
  }, { once: true });
});
