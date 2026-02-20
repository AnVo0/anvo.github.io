<?php
// config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'mediadb');
define('DB_USER', 'root'); // На хостинге поменять!
define('DB_PASS', ''); // На хостинге добавить пароль!

define('SITE_EMAIL', 'noreply@mediaru.ru');
define('SITE_NAME', 'Медийная раскрутка');
define('ADMIN_EMAIL', 'avopsev80@gmail.com');

define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('MAX_MESSAGE_LENGTH', 1000);
define('MESSAGES_PER_PAGE', 20);

// Секретный ключ для CSRF защиты
define('CSRF_SECRET', 'your-secret-key-here-change-it'); // Изменить!

// Настройки SMTP (если mail() не работает)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'avopsev80@gmail.com');
define('SMTP_PASS', 'your-app-password'); // Пароль приложения!

// Режим отладки
define('DEBUG_MODE', false); // На продакшене выключить!
?>