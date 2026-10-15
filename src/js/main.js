/* =========================================
   АНИМАЦИИ ПРИ СКРОЛЛЕ (Intersection Observer)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // Настройки наблюдателя
    const observerOptions = {
        root: null,          // Отслеживаем относительно окна браузера
        rootMargin: '0px',
        threshold: 0.15      // Срабатывает, когда 15% элемента появилось в зоне видимости
    };

    // Функция-колбэк, которая добавляет класс .is-visible
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Анимируем только 1 раз
            }
        });
    };

    // Создаем наблюдатель
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Находим все элементы, которые нужно анимировать
    const animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach(el => observer.observe(el));
});

/* =========================================
   ОБРАБОТКА ФОРМЫ "Задать вопрос"
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const askForm = document.getElementById('askForm');

    if (askForm) {
        askForm.addEventListener('submit', (e) => {
            e.preventDefault();   // Пока не отправляем на сервер

            // Здесь можно сделать AJAX-запрос на сервер
            // Пока просто показываем сообщение об успехе

            const name = document.getElementById('askName').value.trim();
            const phone = document.getElementById('askPhone').value.trim();
            const message = document.getElementById('askMessage').value.trim();

            if (!name || !phone) {
                alert('Пожалуйста, заполните имя и телефон');
                return;
            }

            // Меняем содержимое формы на сообщение об успехе
            askForm.innerHTML = `
                <div style="text-align: center; padding: 20px 0;">
                    <div style="width: 64px; height: 64px; margin: 0 auto 20px; border-radius: 50%; background-color: #E8E4D8; display: flex; align-items: center; justify-content: center;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F3828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; color: #2C3325; margin-bottom: 8px;">Спасибо, ${name}!</h3>
                    <p style="font-size: 14px; color: #6B7264; line-height: 1.5;">Я свяжусь с вами в ближайшее время по номеру ${phone}</p>
                </div>
            `;

            // Автоматически закрываем через 3 секунды
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('askQuestionModal'));
                modal.hide();
            }, 3000);
        });
    }
});