/* ============================================
   Siddhi Vinayak Global MedConnect — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== PAGE LOADER ====================
  const pageLoader = document.getElementById('pageLoader');
  setTimeout(() => {
    pageLoader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2200);

  // ==================== SCROLL PROGRESS BAR ====================
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress);

  // ==================== NAVBAR SCROLL ====================
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==================== MOBILE MENU ====================
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ==================== ACTIVE NAV LINK ====================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const activeLink = navLinks.querySelector(`a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ==================== HERO PARTICLES ====================
  const particlesContainer = document.getElementById('heroParticles');

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particlesContainer.appendChild(particle);
  }

  // ==================== CURSOR GLOW (desktop) ====================
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ==================== COUNTER ANIMATION ====================
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    const text = el.textContent;
    let suffix = '';
    if (text.includes('+')) suffix = '+';
    if (text.includes('%')) suffix = '%';

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ==================== SCROLL REVEAL ====================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ==================== RIPPLE EFFECT ON BUTTONS ====================
  document.querySelectorAll('.btn, .nav-cta, .btn-submit, .whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ==================== 3D TILT EFFECT ON CARDS ====================
  document.querySelectorAll('.why-card, .uni-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==================== TESTIMONIAL SLIDER ====================
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const cards = track.querySelectorAll('.testimonial-card');
  let currentSlide = 0;
  let slideInterval;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % cards.length);
  }

  function startAutoSlide() { slideInterval = setInterval(nextSlide, 5000); }
  function stopAutoSlide() { clearInterval(slideInterval); }
  startAutoSlide();

  const slider = document.querySelector('.testimonial-slider');
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  // Touch support
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(Math.min(currentSlide + 1, cards.length - 1));
      else goToSlide(Math.max(currentSlide - 1, 0));
    }
    startAutoSlide();
  }, { passive: true });

  // ==================== PARALLAX SCROLL ====================
  const heroVisual = document.querySelector('.hero-visual');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroVisual && scrollY < window.innerHeight) {
      heroVisual.style.transform = `translateY(calc(-50% + ${scrollY * 0.15}px))`;
    }
  });

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Email...';
    btn.disabled = true;

    // Gather form data
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value || 'N/A';
    const message = document.getElementById('message').value || 'N/A';

    // Format Email Content
    const emailSubject = `New Free Counseling Request - ${fullName}`;
    let emailBody = `New Inquiry Details:\n\n`;
    emailBody += `Name: ${fullName}\n`;
    emailBody += `Phone: ${phone}\n`;
    emailBody += `Email: ${email}\n`;
    emailBody += `City/State: ${city}\n\n`;
    emailBody += `Message: ${message}`;

    const mailtoUrl = `mailto:contact.svglobalmedconnect@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Trigger email client immediately
    window.location.href = mailtoUrl;

    // Update button state and reset form
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Opening Email...';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
    }, 2000);
  });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ==================== TYPING EFFECT FOR HERO DESCRIPTION ====================
  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) {
    const fullText = heroDesc.textContent.trim();
    heroDesc.textContent = '';
    heroDesc.style.opacity = '1';
    let charIndex = 0;

    function typeChar() {
      if (charIndex < fullText.length) {
        heroDesc.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 15);
      }
    }

    setTimeout(typeChar, 1200);
  }

  // ==================== ADMISSION FORM MULTI-STEP ====================
  const admissionForm = document.getElementById('admissionForm');
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressLines = document.querySelectorAll('.progress-line');

  window.nextStep = function(step) {
    // Hide current step
    document.querySelector('.form-step.active').classList.remove('active');
    // Show target step
    document.getElementById('formStep' + step).classList.add('active');

    // Update progress indicator
    progressSteps.forEach(ps => {
      const s = parseInt(ps.dataset.step);
      ps.classList.remove('active', 'completed');
      if (s === step) ps.classList.add('active');
      else if (s < step) ps.classList.add('completed');
    });

    // Fill progress lines
    progressLines.forEach((line, i) => {
      if (i < step - 1) line.classList.add('filled');
      else line.classList.remove('filled');
    });

    // Scroll to form top
    document.querySelector('.admission-form-wrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.prevStep = function(step) {
    window.nextStep(step);
  };

  // Admission form submission
  if (admissionForm) {
    const handleAdmissionSubmit = (e) => {
      e.preventDefault();

      
      const btn = admissionForm.querySelector('.admission-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Email...';
      btn.disabled = true;

      // Helper function to safely get value or text
      const getVal = (id) => document.getElementById(id)?.value || 'N/A';
      const getText = (id) => {
        const el = document.getElementById(id);
        return el && el.selectedIndex >= 0 ? el.options[el.selectedIndex].text : 'N/A';
      };

      // Gather form data safely
      const fName = getVal('admFirstName');
      const lName = getVal('admLastName');
      const email = getVal('admEmail');
      const phone = getVal('admPhone');
      const dob = getVal('admDob');
      const gender = getText('admGender');
      const address = getVal('admAddress');
      const city = getVal('admCity');
      const state = getVal('admState');

      const board = getText('admBoard');
      const year = getText('admYear');
      const percent = getVal('admPercent');
      const neet = getVal('admNeet');
      const pcb = getVal('admPcb');
      const english = getVal('admEnglish');

      const course = getText('admCourse');
      const country = getText('admCountry'); // Safe even if removed from HTML
      const budget = getText('admBudget');
      const intake = getText('admIntake');
      const passport = getText('admPassport');
      const message = getVal('admMessage');
      const emailSubject = `New Admission Application: ${fName} ${lName}`;

      // Send Email silently via FormSubmit API
      fetch("https://formsubmit.co/ajax/contact.svglobalmedconnect@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          "--- PERSONAL DETAILS ---": "----------------",
          "First Name": fName,
          "Last Name": lName,
          "Email": email,
          "Phone": phone,
          "Date of Birth": dob,
          "Gender": gender,
          "City & State": `${city}, ${state}`,
          "Street Address": address,
          "--- ACADEMIC DETAILS ---": "----------------",
          "12th Board & Year": `${board} (${year})`,
          "12th Overall %": percent,
          "PCB %": pcb,
          "English Marks": english,
          "NEET Score": neet,
          "--- PREFERENCES ---": "----------------",
          "Target Course": course,
          "Estimated Budget": budget,
          "Intake Year": intake,
          "Passport Status": passport,
          "Additional Message": message
        })
      })
      .then(response => response.json())
      .then(data => {
        // Success
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Application Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
          admissionForm.reset();
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
          window.nextStep(1); // Return to step 1
        }, 3000);
      })
      .catch(error => {
        // Fallback error
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error Sending';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
        console.error(error);
      });
    };

    admissionForm.addEventListener('submit', handleAdmissionSubmit);
    admissionForm.querySelector('.admission-submit').addEventListener('click', handleAdmissionSubmit);
  }

});
