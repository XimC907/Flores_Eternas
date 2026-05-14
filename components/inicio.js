document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Cierra otros abiertos (opcional)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });

        // Abre o cierra el actual
        faqItem.classList.toggle('active');
    });
});

const carousel = document.getElementById('carousel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Configura cuánto se debe mover al hacer clic
nextBtn.addEventListener('click', () => {
    carousel.scrollLeft += carousel.offsetWidth / 2;
});

prevBtn.addEventListener('click', () => {
    carousel.scrollLeft -= carousel.offsetWidth / 2;
});