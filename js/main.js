document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Анимации появления (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));


    // --- 2. Логика переключения DOC / PDF в "Самостоятельной работе" ---
    const tabDoc = document.getElementById('tabDoc');
    const tabPdf = document.getElementById('tabPdf');
    const fileCards = document.querySelectorAll('.file-card');

    // Временные ссылки для примера (потом заменишь на реальные)
    const filesDoc = [
        'files/doc1.doc', 'files/doc2.doc', 'files/doc3.doc',
        'files/doc4.doc', 'files/doc5.doc', 'files/doc6.doc'
    ];
    const filesPdf = [
        'files/pdf1.pdf', 'files/pdf2.pdf', 'files/pdf3.pdf',
        'files/pdf4.pdf', 'files/pdf5.pdf', 'files/pdf6.pdf'
    ];

    if (tabDoc && tabPdf && fileCards.length > 0) {
        // Клик по DOC
        tabDoc.addEventListener('click', () => {
            tabDoc.classList.add('active');
            tabPdf.classList.remove('active');
            fileCards.forEach((card, index) => {
                if (filesDoc[index]) card.href = filesDoc[index];
            });
        });

        // Клик по PDF
        tabPdf.addEventListener('click', () => {
            tabPdf.classList.add('active');
            tabDoc.classList.remove('active');
            fileCards.forEach((card, index) => {
                if (filesPdf[index]) card.href = filesPdf[index];
            });
        });
    }
});