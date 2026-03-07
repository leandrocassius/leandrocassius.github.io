/**
 * Terminal portfolio - typing effect & scroll animations
 */

(function () {
  const TYPING_STRINGS = [
    'whoami',
    'cat resume.txt',
    'ls projects/',
    //'echo "Open to opportunities"'
  ];
  const TYPING_DELAY = 80;
  const PAUSE_BEFORE_DELETE = 2000;
  const PAUSE_AFTER_DELETE = 500;

  const typedEl = document.getElementById('typed');
  if (!typedEl) return;

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = TYPING_STRINGS[stringIndex];

    if (isDeleting) {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % TYPING_STRINGS.length;
        setTimeout(type, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(type, TYPING_DELAY / 2);
      return;
    }

    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, PAUSE_BEFORE_DELETE);
      return;
    }

    setTimeout(type, TYPING_DELAY);
  }

  // Start typing after a short delay
  setTimeout(type, 800);

  // Optional: subtle fade-in for blocks on scroll
  const blocks = document.querySelectorAll('.terminal-block');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  blocks.forEach((block) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(10px)';
    block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(block);
  });
})();
