// Toggle light/dark theme
const toggleBtn = document.getElementById('themeButton');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.body.classList.add(currentTheme);
} else {
  document.body.classList.add('light'); // default theme
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form-fields');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const projectType = formData.get('project-type');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !projectType || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Create mailto link
      const subject = `Project Inquiry: ${projectType}`;
      const body = `Hi Aarif,

My name is ${name} and I'm interested in working with you.

Project Type: ${projectType}
Email: ${email}

Message:
${message}

Looking forward to hearing from you!

Best regards,
${name}`;
      
      const mailtoLink = `mailto:ariff532.ama@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      const submitBtn = this.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent! ✅';
      submitBtn.style.background = '#27ae60';
      
      // Reset form and button after 3 seconds
      setTimeout(() => {
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  }
});

// Add animation on scroll for project cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe project cards and other animated elements
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.project-card, .contact-item, .stat');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Add typing effect to the tagline
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const originalText = tagline.textContent;
    setTimeout(() => {
      typeWriter(tagline, originalText, 50);
    }, 1000);
  }
});

// Add skill level animations
document.addEventListener('DOMContentLoaded', function() {
  const skillItems = document.querySelectorAll('.skills li');
  
  skillItems.forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateX(-50px)';
    skill.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    setTimeout(() => {
      skill.style.opacity = '1';
      skill.style.transform = 'translateX(0)';
    }, 500 + (index * 100));
  });
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }
  
  updateCounter();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      if (statNumber && !statNumber.classList.contains('animated')) {
        statNumber.classList.add('animated');
        const target = parseInt(statNumber.textContent);
        animateCounter(statNumber, target);
      }
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const stats = document.querySelectorAll('.stat');
  stats.forEach(stat => {
    statsObserver.observe(stat);
  });
});

// Add menu toggle functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu');
  
  if (menuToggle && menu) {
    menuToggle.addEventListener('change', function() {
      if (this.checked) {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.position = 'absolute';
        menu.style.top = '100%';
        menu.style.left = '0';
        menu.style.width = '100%';
        menu.style.background = document.body.classList.contains('dark') ? '#1e1e2f' : '#f4f4f4';
        menu.style.padding = '20px';
        menu.style.borderRadius = '0 0 12px 12px';
        menu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      } else {
        menu.style.display = '';
        menu.style.flexDirection = '';
        menu.style.position = '';
        menu.style.top = '';
        menu.style.left = '';
        menu.style.width = '';
        menu.style.background = '';
        menu.style.padding = '';
        menu.style.borderRadius = '';
        menu.style.boxShadow = '';
      }
    });
  }
});

