<?php
// Настройки подключения к БД
$host = 'localhost';
$dbname = 'mediadb';
$username = 'root'; // На хостинге заменить на реального пользователя
$password = ''; // На хостинге добавить пароль

// Настройки почты
$to_email = 'avopsev80@gmail.com'; // Ваша почта
$site_email = 'noreply@mediaru.ru'; // От какого email отправлять
$site_name = 'Медийная раскрутка';

// Подключение к БД
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'Ошибка подключения к БД']));
}

// Получение данных из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    die(json_encode(['success' => false, 'message' => 'Нет данных']));
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');
$ip = $_SERVER['REMOTE_ADDR'] ?? '';

// Валидация
if (empty($name) || empty($email) || empty($message)) {
    die(json_encode(['success' => false, 'message' => 'Заполните все поля']));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die(json_encode(['success' => false, 'message' => 'Некорректный email']));
}

// Сохранение в БД
try {
    $stmt = $pdo->prepare("INSERT INTO messages (name, email, message, ip_address) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $message, $ip]);
    $message_id = $pdo->lastInsertId();
} catch(PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'Ошибка сохранения в БД']));
}

// Отправка email
$subject = "Новое сообщение с сайта от $name";
$email_message = "
<html>
<head>
    <title>Новое сообщение с сайта</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .message-box { 
            background: #f5f5f5; 
            padding: 20px; 
            border-radius: 5px;
            margin: 20px 0;
        }
        .label { color: #666; font-size: 12px; }
        .value { font-size: 16px; margin-bottom: 15px; }
    </style>
</head>
<body>
    <h2>Новое сообщение с сайта Медийная раскрутка</h2>
    
    <div class='message-box'>
        <div class='label'>Отправитель:</div>
        <div class='value'><strong>$name</strong></div>
        
        <div class='label'>Email:</div>
        <div class='value'>$email</div>
        
        <div class='label'>Сообщение:</div>
        <div class='value'>$message</div>
        
        <div class='label'>IP адрес:</div>
        <div class='value'>$ip</div>
        
        <div class='label'>ID сообщения:</div>
        <div class='value'>#$message_id</div>
    </div>
    
    <p>Просмотреть все сообщения можно в <a href='http://ваш-сайт/admin'>панели управления</a></p>
</body>
</html>
";

// Заголовки для HTML письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: $site_name <$site_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Отправка
if (mail($to_email, $subject, $email_message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Сообщение отправлено!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки email, но сообщение сохранено в БД']);
}
?>