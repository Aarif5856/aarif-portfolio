// Enhanced Portfolio JavaScript - Modern & Smooth
class ModernPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.initAOS();
    this.initNavigation();
    this.initScrollEffects();
    this.initContactForm();
    this.initThemeToggle();
    this.initParticles();
    this.initTypewriter();
    this.initScrollProgress();
  }

  // Initialize AOS (Animate On Scroll)
  initAOS() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100
    });
  }

  // Navigation functionality
  initNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
      });
    });

    // Mobile menu toggle
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Update active navigation based on scroll position
    this.updateActiveNavigation();
  }

  // Update active navigation based on scroll position
  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  // Scroll effects and animations
  initScrollEffects() {
    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
      });
    }

    // Reveal animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .project-card, .about-text').forEach(el => {
      observer.observe(el);
    });
  }

  // Contact form functionality
  initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        // Simulate form submission (replace with actual endpoint)
        await this.simulateFormSubmission(data);
        
        // Show success message
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
      } catch (error) {
        // Show error message
        this.showNotification('Failed to send message. Please try again.', 'error');
      } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Simulate form submission
  async simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Form data:', data);
        // Simulate success (90% chance)
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Theme toggle functionality
  initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light', currentTheme === 'light');

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const newTheme = document.body.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
    });
  }

  // Particle effect for hero section
  initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor(canvas.width / 20));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 172, 254, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  }

  // Typewriter effect for hero text
  initTypewriter() {
    const typewriterElement = document.querySelector('.hero-text .subtitle');
    if (!typewriterElement) return;

    const texts = [
      'Full Stack Developer & Cybersecurity Expert',
      'Python Automation Specialist',
      'Flutter Mobile Developer',
      'Ethical Hacking Professional'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const typeWriter = () => {
      const currentText = texts[textIndex];
      
      if (!isDeleting && charIndex <= currentText.length) {
        typewriterElement.textContent = currentText.slice(0, charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      } else if (isDeleting && charIndex >= 0) {
        typewriterElement.textContent = currentText.slice(0, charIndex);
        charIndex--;
        setTimeout(typeWriter, 50);
      } else if (!isDeleting && charIndex > currentText.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          typeWriter();
        }, 2000);
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeWriter, 500);
      }
    };

    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
  }

  // Scroll progress indicator
  initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      z-index: 9999;
      transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ModernPortfolio();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollTo = (target) => {
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = Math.abs(distance) / 1000 * 500; // Adjust speed as needed
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = easeInOutCubic(progress / duration);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  // Override smooth scrolling for older browsers
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScrollTo(target);
      }
    });
  });
}

// Add CSS for notifications
const notificationStyles = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
  }

  .notification.show {
    transform: translateX(0);
  }

  .notification-success {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  .notification-error {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .notification-content i {
    font-size: 1.2rem;
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
