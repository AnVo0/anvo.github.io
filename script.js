// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем главную страницу при старте
    loadPage('home');
    
    // Добавляем обработчики для всех ссылок навигации (верхнее меню)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
            updateAnimation(page);
            updateActiveLink(this);
            updatePageTitle(page);
        });
    });
    
    // Добавляем обработчик для ссылок в футере (динамически)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('footer-link')) {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            loadPage(page);
            
            // Находим соответствующую ссылку в верхнем меню и обновляем анимацию
            const navLink = document.querySelector(`.nav-link[data-page="${page}"]`);
            if (navLink) {
                updateAnimation(page);
                updateActiveLink(navLink);
            }
            
            updatePageTitle(page);
            
            // Плавный скролл к верху страницы
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Функция загрузки страницы
function loadPage(pageName) {
    const contentContainer = document.getElementById('content-container');
    
    // Показываем индикатор загрузки
    contentContainer.innerHTML = '<div class="loader">Загрузка...</div>';
    
    // Определяем путь к файлу страницы
    let pagePath;
    switch(pageName) {
        case 'home':
            pagePath = 'pages/home.html';
            break;
        case 'about':
            pagePath = 'pages/about.html';
            break;
        case 'blog':
            pagePath = 'pages/blog.html';
            break;
        case 'portfolio':
            pagePath = 'pages/portfolio.html';
            break;
        case 'contact':
            pagePath = 'pages/contact.html';
            break;
        default:
            pagePath = 'pages/home.html';
    }
    
    // Загружаем контент страницы
    fetch(pagePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Страница не найдена');
            }
            return response.text();
        })
        .then(html => {
            // Вставляем только контент страницы (без футера)
            contentContainer.innerHTML = html;
            
            // Добавляем анимацию появления
            contentContainer.style.animation = 'fadeIn 0.5s ease';
            
            // Инициализируем специфичные для страницы функции
            initPageScripts(pageName);
        })
        .catch(error => {
            contentContainer.innerHTML = `<div class="error">Ошибка загрузки страницы: ${error.message}</div>`;
        });
}

// Функция создания футера (будет вызвана один раз в HTML)
function createFooter() {
    return `
        <footer class="site-footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>О нас</h3>
                    <p>Мы занимаемся профессиональной медийной раскруткой вашего бизнеса в интернете.</p>
                </div>
                
                <div class="footer-section">
                    <h3>Быстрые ссылки</h3>
                    <ul class="footer-links">
                        <li><a href="#" data-page="home" class="footer-link">Главная</a></li>
                        <li><a href="#" data-page="about" class="footer-link">О нас</a></li>
                        <li><a href="#" data-page="blog" class="footer-link">Блог</a></li>
                        <li><a href="#" data-page="portfolio" class="footer-link">Портфолио</a></li>
                        <li><a href="#" data-page="contact" class="footer-link">Контакты</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Контакты</h3>
                    <ul class="footer-contact">
                        <li>📞 +7 (953) 171-39-47</li>
                        <li>✉️ avopsev80@gmail.com</li>
                        <li>📍 Санкт-Петербург, ул. Пушкина, 123</li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Правовая информация</h3>
                    <ul class="footer-legal">
                        <li><a href="#" class="legal-link" data-modal="privacy">Политика конфиденциальности</a></li>
                        <li><a href="#" class="legal-link" data-modal="personal">Согласие на обработку персональных данных</a></li>
                        <li><a href="#" class="legal-link" data-modal="terms">Пользовательское соглашение</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Медийная раскрутка. Все права защищены.</p>
            </div>
        </footer>
        
        <!-- Модальные окна для правовой информации -->
        <div id="privacy-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Политика конфиденциальности</h2>
                <div class="modal-body">
                    <h3>1. Общие положения</h3>
                    <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных.</p>
                    
                    <h3>2. Основные понятия</h3>
                    <p>Персональные данные - любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).</p>
                    
                    <h3>3. Цели обработки персональных данных</h3>
                    <p>Цель обработки персональных данных - информирование пользователя посредством отправки электронных писем; предоставление доступа пользователю к сервисам.</p>
                    
                    <h3>4. Правовые основания обработки персональных данных</h3>
                    <p>Правовым основанием обработки персональных данных является: уставные документы Оператора; договоры, заключаемые между оператором и субъектом персональных данных.</p>
                    
                    <h3>5. Сбор и обработка персональных данных</h3>
                    <p>Все персональные данные собираются только с согласия субъекта персональных данных и используются исключительно в целях, указанных в данном документе.</p>
                </div>
            </div>
        </div>
        
        <div id="personal-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Согласие на обработку персональных данных</h2>
                <div class="modal-body">
                    <h3>Согласие на обработку персональных данных</h3>
                    <p>Нажимая кнопку «Отправить» или продолжая использование сайта, вы даете согласие на обработку своих персональных данных в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных» на следующих условиях:</p>
                    
                    <h4>1. Перечень персональных данных:</h4>
                    <ul>
                        <li>Фамилия, имя, отчество</li>
                        <li>Номер контактного телефона</li>
                        <li>Адрес электронной почты</li>
                    </ul>
                    
                    <h4>2. Цели обработки персональных данных:</h4>
                    <ul>
                        <li>Связь с пользователем в случае необходимости</li>
                        <li>Направление информации о услугах компании</li>
                        <li>Проведение маркетинговых исследований</li>
                    </ul>
                    
                    <h4>3. Способы обработки персональных данных:</h4>
                    <p>Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача, блокирование, удаление, уничтожение персональных данных.</p>
                    
                    <p>Согласие действует бессрочно с момента предоставления данных и может быть отозвано путем направления письменного заявления.</p>
                </div>
            </div>
        </div>
        
        <div id="terms-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Пользовательское соглашение</h2>
                <div class="modal-body">
                    <h3>1. Термины и определения</h3>
                    <p>1.1. Сайт - совокупность текстов, графических элементов, дизайна, изображений, программного кода, фото- и видеоматериалов.</p>
                    
                    <h3>2. Предмет соглашения</h3>
                    <p>2.1. Администрация сайта предоставляет Пользователю право на просмотр, копирование, сбор и использование материалов сайта исключительно в личных некоммерческих целях.</p>
                    
                    <h3>3. Права и обязанности сторон</h3>
                    <p>3.1. Пользователь обязуется не распространять материалы сайта с нарушением действующего законодательства РФ.</p>
                    
                    <h3>4. Ответственность</h3>
                    <p>4.1. Администрация сайта не несет ответственности за возможный ущерб, причиненный Пользователю в результате использования информации с сайта.</p>
                    
                    <h3>5. Заключительные положения</h3>
                    <p>5.1. Настоящее Соглашение вступает в силу с момента начала использования сайта Пользователем и действует в течение всего времени использования сайта.</p>
                </div>
            </div>
        </div>
    `;
}

// Функция инициализации модальных окон
function initFooterModals() {
    const modalLinks = document.querySelectorAll('.legal-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Открытие модального окна
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal') + '-modal';
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие по крестику
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

// Остальные функции...
function updateAnimation(pageName) {
    const animation = document.querySelector('.animation');
    
    // Удаляем все классы start-*
    animation.className = 'animation';
    
    // Добавляем новый класс
    animation.classList.add(`start-${pageName}`);
    
    // Обновляем ширину и позицию анимации
    const links = document.querySelectorAll('.nav-link');
    let leftPosition = 0;
    let width = 0;
    
    links.forEach((link, index) => {
        if (link.getAttribute('data-page') === pageName) {
            leftPosition = link.offsetLeft;
            width = link.offsetWidth;
        }
    });
    
    if (width > 0) {
        animation.style.width = width + 'px';
        animation.style.left = leftPosition + 'px';
    }
}

function updateActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updatePageTitle(pageName) {
    const titles = {
        'home': 'Главная',
        'about': 'О нас',
        'blog': 'Блог',
        'portfolio': 'Портфолио',
        'contact': 'Контакты'
    };
    
    document.title = `Медийная раскрутка - ${titles[pageName]}`;
}

function initPageScripts(pageName) {
    switch(pageName) {
        case 'home':
            console.log('Главная страница загружена');
            break;
        case 'blog':
            loadBlogPosts();
            break;
        case 'portfolio':
            initGallery();
            break;
        case 'contact':
            initContactForm();
            break;
    }
}

function loadBlogPosts() {
    const blogPosts = [
        {title: 'Как продвигать бренд в 2026', date: '19.02.2026'},
        {title: 'Тренды медийной рекламы', date: '18.02.2026'},
        {title: 'Кейс: успешная раскрутка', date: '17.02.2026'}
    ];
    
    const blogContainer = document.querySelector('.blog-posts');
    if (blogContainer) {
        let html = '';
        blogPosts.forEach(post => {
            html += `
                <article class="blog-post">
                    <h3>${post.title}</h3>
                    <p class="date">${post.date}</p>
                </article>
            `;
        });
        blogContainer.innerHTML = html;
    }
}

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Открыть изображение:', this.dataset.image);
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Получаем данные
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Валидация
            if (!name || !email || !message) {
                showStatus('Заполните все поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showStatus('Введите корректный email', 'error');
                return;
            }
            
            // Блокируем кнопку
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            try {
                const response = await fetch('send_message.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showStatus('Сообщение отправлено! Мы свяжемся с вами скоро.', 'success');
                    form.reset();
                } else {
                    showStatus(result.message || 'Ошибка отправки', 'error');
                }
            } catch (error) {
                showStatus('Ошибка соединения с сервером', 'error');
                console.error('Error:', error);
            } finally {
                // Разблокируем кнопку
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
            }
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('form-status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.style.display = 'block';
        statusDiv.style.backgroundColor = type === 'success' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)';
        statusDiv.style.color = type === 'success' ? '#2ecc71' : '#e74c3c';
        statusDiv.style.border = `1px solid ${type === 'success' ? '#2ecc71' : '#e74c3c'}`;
        
        // Скрываем через 5 секунд
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// Простая и надежная карусель
function initSimpleCarousel() {
    const slides = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.simple-prev');
    const nextBtn = document.querySelector('.simple-next');
    const dotsContainer = document.querySelector('.simple-dots');
    const slidesContainer = document.querySelector('.carousel-slides');
    
    if (!slides.length || !slidesContainer) return;
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    
    // Создание точек
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        
        const totalDots = Math.ceil(slides.length / slidesPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('simple-dot');
            dot.dataset.index = i;
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Получение количества слайдов на экране
    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }
    
    // Переход к определенному слайду
    function goToSlide(index) {
        const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
        
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        
        currentIndex = index;
        
        // Расчет смещения
        const slideWidth = slides[0].offsetWidth + 30; // 30px - gap
        const offset = currentIndex * slidesPerView * slideWidth;
        
        slidesContainer.style.transform = `translateX(-${offset}px)`;
        
        // Обновление активной точки
        document.querySelectorAll('.simple-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Обновление кнопок
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
        }
    }
    
    // Следующий слайд
    function nextSlide() {
        const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        }
    }
    
    // Предыдущий слайд
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Обновление при изменении размера окна
    function handleResize() {
        const newSlidesPerView = getSlidesPerView();
        
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            createDots();
            
            // Возврат к первому слайду при изменении размера
            currentIndex = 0;
            goToSlide(0);
        } else {
            // Просто обновляем позицию
            goToSlide(currentIndex);
        }
    }
    
    // Инициализация
    createDots();
    goToSlide(0);
    
    // Обработчики событий
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Автопрокрутка
    let autoplayInterval = setInterval(() => {
        const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
        
        if (currentIndex >= maxIndex) {
            goToSlide(0);
        } else {
            nextSlide();
        }
    }, 5000);
    
    // Остановка автопрокрутки при наведении
    const carousel = document.querySelector('.simple-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
                
                if (currentIndex >= maxIndex) {
                    goToSlide(0);
                } else {
                    nextSlide();
                }
            }, 5000);
        });
    }
    
    // Обработка ресайза
    window.addEventListener('resize', handleResize);
    
    // Touch-события для мобильных
    let touchStartX = 0;
    
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoplayInterval);
    }, { passive: true });
    
    slidesContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        // Возобновляем автопрокрутку
        autoplayInterval = setInterval(() => {
            const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
            
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                nextSlide();
            }
        }, 5000);
    }, { passive: true });
}

// Обновите функцию initPageScripts
function initPageScripts(pageName) {
    switch(pageName) {
        case 'home':
            console.log('Главная страница загружена');
            break;
        case 'about':
            // Запускаем карусель с небольшой задержкой
            setTimeout(() => {
                initSimpleCarousel();
            }, 100);
            break;
        case 'blog':
            loadBlogPosts();
            break;
        case 'portfolio':
            initGallery();
            break;
        case 'contact':
            initContactForm();
            break;
    }
}

// Улучшение навигации для мобильных
function enhanceMobileNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    if (window.innerWidth <= 600) {
        // Закрытие меню после клика на мобильных
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Можно добавить плавный скролл к контенту
                setTimeout(() => {
                    document.getElementById('content-container').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            });
        });
        
        // Добавляем обработку свайпов для меню
        let touchStartY = 0;
        navWrapper.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        navWrapper.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) {
                // Свайп вверх/вниз для скролла
                window.scrollBy({
                    top: diff > 0 ? 100 : -100,
                    behavior: 'smooth'
                });
            }
        }, { passive: true });
    }
}

// Вызвать после загрузки страницы и при изменении размера
window.addEventListener('load', enhanceMobileNavigation);
window.addEventListener('resize', enhanceMobileNavigation);

// Хранилище контента страниц
const pageContent = {
    home: `
        <div class="page home-page">
            <h2>Добро пожаловать на наш сайт!</h2>
            <p>Мы занимаемся профессиональной медийной раскруткой вашего бизнеса в интернете.</p>
            
            <div class="features">
                <div class="feature">
                    <h3>🚀 Быстро</h3>
                    <p>Быстрый рост популярности</p>
                </div>
                <div class="feature">
                    <h3>🎯 Точно</h3>
                    <p>Точное попадание в целевую аудиторию</p>
                </div>
                <div class="feature">
                    <h3>💪 Эффективно</h3>
                    <p>Максимальный результат</p>
                </div>
            </div>
        </div>
    `,
    about: `
        <div class="page about-page">
            <h2>О нашей компании</h2>
            <p>Мы команда профессионалов с многолетним опытом в медийной раскрутке.</p>
            
            <div class="stats">
                <div class="stat">
                    <span class="number">50+</span>
                    <span class="label">Проектов</span>
                </div>
                <div class="stat">
                    <span class="number">5 лет</span>
                    <span class="label">На рынке</span>
                </div>
                <div class="stat">
                    <span class="number">100%</span>
                    <span class="label">Клиентов довольны</span>
                </div>
            </div>

            <div class="team-section">
                <h3>Наша команда</h3>
                <!-- Карусель -->
            </div>
        </div>
    `,
    blog: `
        <div class="page blog-page">
            <h2>Наш блог</h2>
            <p>Последние новости и статьи из мира медийной раскрутки</p>
            <div class="blog-posts"></div>
        </div>
    `,
    portfolio: `
        <div class="page portfolio-page">
            <h2>Наши работы</h2>
            <p>Примеры успешных проектов</p>
            <div class="gallery"></div>
        </div>
    `,
    contact: `
        <div class="page contact-page">
            <h2>Свяжитесь с нами</h2>
            
            <form id="contact-form">
                <input type="text" id="name" placeholder="Ваше имя" required>
                <input type="email" id="email" placeholder="Email" required>
                <textarea id="message" placeholder="Сообщение" rows="5" required></textarea>
                <button type="submit" id="submit-btn">Отправить</button>
                <div id="form-status"></div>
            </form>
            
            <div class="contact-info">
                <p>📞 +7 (953) 171-39-47</p>
                <p>✉️ avopsev80@gmail.com</p>
                <p>📍 Санкт-Петербург, улица Пушкина, дом 123</p>
            </div>
        </div>
    `
};

document.addEventListener('DOMContentLoaded', function() {
    // Загружаем страницу из URL hash или home
    const hash = window.location.hash.substring(1) || 'home';
    loadPage(hash);
    
    // Обработка кликов по ссылкам
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            window.location.hash = page;
            loadPage(page);
            updateAnimation(page);
            updateActiveLink(this);
        });
    });
    
    // Обработка изменения hash
    window.addEventListener('hashchange', function() {
        const page = window.location.hash.substring(1) || 'home';
        loadPage(page);
    });
});

function loadPage(pageName) {
    const contentContainer = document.getElementById('content-container');
    
    if (pageContent[pageName]) {
        contentContainer.innerHTML = pageContent[pageName];
        
        // Инициализация специфичных функций
        if (pageName === 'blog') loadBlogPosts();
        if (pageName === 'portfolio') initGallery();
        if (pageName === 'contact') initContactForm();
        if (pageName === 'about') initSimpleCarousel();
        
        // Обновление анимации
        const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        if (activeLink) {
            updateAnimation(pageName);
            updateActiveLink(activeLink);
        }
        
        // Прокрутка к началу
        window.scrollTo(0, 0);
    }
}

// Остальные функции (updateAnimation, updateActiveLink, loadBlogPosts и т.д.)