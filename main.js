const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

const navCta = document.getElementById('navCtaDesktop');
function toggleNavCta() {
    navCta.style.display = window.innerWidth > 768 ? 'inline-block' : 'none';
}
toggleNavCta();
window.addEventListener('resize', toggleNavCta);

const serviceCards = document.querySelectorAll('.service-card');
const modal = document.getElementById('serviceModal');
const modalCloseBtn = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalImage = document.getElementById('modalImage');
let isModalOpen = false;

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    isModalOpen = false;
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.service-card-title').textContent;
        const iconHtml = card.querySelector('.service-card-icon').innerHTML;
        const modalHtml = card.querySelector('.service-modal-html').innerHTML;
        const imgEl = card.querySelector('.service-card-image img');

        modalTitle.textContent = title;
        modalIcon.innerHTML = iconHtml;
        modalContent.innerHTML = modalHtml;
        
        if (modalImage && imgEl) {
            modalImage.src = imgEl.src;
            modalImage.alt = imgEl.alt;
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        isModalOpen = true;
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

function animateCounter(el, target, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    const start = 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);
        el.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

let countersAnimated = false;
const countersSection = document.querySelector('.counters');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            const counterEls = document.querySelectorAll('.counter-number');
            counterEls.forEach(el => {
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = target === 35 ? '+' : target === 500 ? '+' : '';
                animateCounter(el, target, suffix);
            });
        }
    });
}, { threshold: 0.5 });

counterObserver.observe(countersSection);

const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

const carouselItems = document.querySelectorAll('.carousel-item');
const carouselTrack = document.getElementById('carouselTrack');

if (carouselTrack) {
    carouselItems.forEach(item => {
        item.addEventListener('touchstart', (e) => {
            carouselItems.forEach(i => i.classList.remove('is-active'));
            item.classList.add('is-active');
            carouselTrack.classList.add('is-paused');
        }, { passive: true });
    });

    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.carousel-item')) {
            carouselItems.forEach(i => i.classList.remove('is-active'));
            carouselTrack.classList.remove('is-paused');
        }
    }, { passive: true });
}
