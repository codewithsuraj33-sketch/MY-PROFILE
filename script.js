// Initialize page behavior after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // close menu when clicking on a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function () {
      if (navMenu) navMenu.classList.remove('active');
      if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  });

  // Touch/click handlers to show hover animation on touch devices
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    // on touchstart, add active class briefly so underline/color appears
    link.addEventListener('touchstart', function (e) {
      link.classList.add('active');
      // remove after a short delay so animation is visible
      setTimeout(() => link.classList.remove('active'), 600);
    }, { passive: true });

    // also add keyboard focus support
    link.addEventListener('focus', () => link.classList.add('active'));
    link.addEventListener('blur', () => link.classList.remove('active'));

    // ensure click also shows the effect briefly (useful when menu opens)
    link.addEventListener('click', function () {
      link.classList.add('active');
      setTimeout(() => link.classList.remove('active'), 600);
    });
  });

  // Typing effect for the .typing-text element
  const texts = ['Frontend developer', 'Python Developer', 'Web Developer', 'n8n Automation Developer'];
  const typingElement = document.querySelector('.typing-text');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (!typingElement) return;
    const currentText = texts[textIndex];

    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
      typingElement.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex = Math.min(currentText.length, charIndex + 1);
      typingElement.textContent = currentText.substring(0, charIndex);
    }

    let typingDelay = isDeleting ? 50 : 120;

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingDelay = 2000; // pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingDelay = 500; // brief pause before typing next
    }

    setTimeout(type, typingDelay);
  }

  // start typing after a short delay
  setTimeout(type, 800);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});