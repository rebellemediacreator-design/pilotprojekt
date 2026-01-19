// ===== SMOOTH SCROLL =====
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

// ===== FORM HANDLING =====
const pilotForm = document.getElementById('pilotForm');

if (pilotForm) {
  pilotForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(pilotForm);
    const data = Object.fromEntries(formData.entries());
    
    // Create mailto link
    const subject = encodeURIComponent('Pilotprojekt-Bewerbung: ' + data.company);
    const body = encodeURIComponent(`
Pilotprojekt-Bewerbung

Betrieb: ${data.company}
Ansprechpartner: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone || 'Nicht angegeben'}
Anzahl Azubis: ${data.apprentices}

Nachricht:
${data.message || 'Keine Nachricht'}
    `);
    
    const mailtoLink = `mailto:rebelle.media.creator@gmail.com?subject=${subject}&body=${body}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Vielen Dank für Ihre Bewerbung! Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die E-Mail ab.');
    
    // Reset form
    pilotForm.reset();
  });
}

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER (Fade-in Animation) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.problem-card, .solution-card, .pricing-card, .testimonial-card, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
