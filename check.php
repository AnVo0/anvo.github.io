<?php
// check.php - удалите после проверки!
echo "<h2>Проверка сервера</h2>";

// Проверка PHP
echo "<h3>PHP версия: " . phpversion() . "</h3>";

// Проверка расширений
$extensions = ['pdo_mysql', 'json', 'session', 'mbstring'];
foreach ($extensions as $ext) {
    echo "$ext: " . (extension_loaded($ext) ? '✅' : '❌') . "<br>";
}

// Проверка прав на запись
$test_file = 'test_write.txt';
if (file_put_contents($test_file, 'test')) {
    echo "✅ Права на запись есть<br>";
    unlink($test_file);
} else {
    echo "❌ Нет прав на запись<br>";
}

// Проверка mail()
$test_mail = mail('test@example.com', 'Test', 'Test message');
echo "mail(): " . ($test_mail ? '✅ работает' : '❌ не работает') . "<br>";

// Проверка подключения к БД
require_once 'config.php';
try {
    $pdo = new PDO("mysql:host=".DB_HOST.";charset=utf8", DB_USER, DB_PASS);
    echo "✅ Подключение к MySQL есть<br>";
    
    // Проверка БД
    $stmt = $pdo->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" . DB_NAME . "'");
    if ($stmt->fetch()) {
        echo "✅ База данных '" . DB_NAME . "' существует<br>";
    } else {
        echo "❌ База данных '" . DB_NAME . "' не найдена<br>";
    }
} catch(Exception $e) {
    echo "❌ Ошибка подключения: " . $e->getMessage() . "<br>";
}
?>