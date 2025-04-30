document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
  mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
          mobileNav.classList.remove('active');
      });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80, // Adjust for fixed header
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Add scroll event listener for navbar
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      } else {
          nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      }
  });
  
  // Horizontal slider controls
  const scrollButtons = document.querySelectorAll('.scroll-btn');
  
  scrollButtons.forEach(button => {
      button.addEventListener('click', function() {
          const direction = this.classList.contains('scroll-left') ? -1 : 1;
          const targetId = this.getAttribute('data-target');
          const slider = document.getElementById(targetId);
          
          if (slider) {
              const scrollAmount = 320; // Width of a card + gap
              slider.scrollBy({
                  left: direction * scrollAmount,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Check if elements are in viewport for custom animations
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.classList.add('active');
          }
      });
  };
  
  // Add fade-in class to elements
  const elementsToAnimate = document.querySelectorAll('.project-card, .tech-badge, .education-card, .achievement-card, .certificate-card, .contact-card');
  elementsToAnimate.forEach(element => {
      if (!element.hasAttribute('data-aos')) {
          element.classList.add('fade-in');
      }
  });
  
  // Run animation on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Keyboard navigation for horizontal sliders
  document.addEventListener('keydown', function(e) {
      if (document.activeElement.closest('.horizontal-slider')) {
          const slider = document.activeElement.closest('.horizontal-slider');
          const scrollAmount = 320;
          
          if (e.key === 'ArrowLeft') {
              slider.scrollBy({
                  left: -scrollAmount,
                  behavior: 'smooth'
              });
          } else if (e.key === 'ArrowRight') {
              slider.scrollBy({
                  left: scrollAmount,
                  behavior: 'smooth'
              });
          }
      }
  });
  
  // Make horizontal sliders focusable for keyboard navigation
  const sliders = document.querySelectorAll('.horizontal-slider');
  sliders.forEach(slider => {
      slider.setAttribute('tabindex', '0');
  });
});