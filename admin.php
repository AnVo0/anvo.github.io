<?php
session_start();

$admin_user = 'admin';
$admin_pass = '456123'; 

if (!isset($_SERVER['PHP_AUTH_USER']) || 
    $_SERVER['PHP_AUTH_USER'] != $admin_user || 
    $_SERVER['PHP_AUTH_PW'] != $admin_pass) {
    header('WWW-Authenticate: Basic realm="Admin Panel"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Требуется авторизация';
    exit;
}

// Подключение к БД
$host = 'localhost';
$dbname = 'mediadb';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die('Ошибка подключения к БД');
}

// Отметить как прочитанное
if (isset($_GET['mark_read'])) {
    $id = (int)$_GET['mark_read'];
    $stmt = $pdo->prepare("UPDATE messages SET is_read = TRUE WHERE id = ?");
    $stmt->execute([$id]);
    header('Location: admin.php');
    exit;
}

// Удалить сообщение
if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
    $stmt->execute([$id]);
    header('Location: admin.php');
    exit;
}

// Получить все сообщения
$stmt = $pdo->query("SELECT * FROM messages ORDER BY created_at DESC");
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Админ-панель - Сообщения</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial; background: #f0f2f5; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #2c3e50; }
        .stats { background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .message { 
            background: #fff; 
            border-radius: 8px; 
            padding: 20px; 
            margin-bottom: 20px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-left: 4px solid #3498db;
        }
        .message.unread { border-left-color: #e74c3c; background: #fff9f9; }
        .message-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .message-date { color: #7f8c8d; font-size: 14px; }
        .message-from { font-size: 18px; font-weight: bold; color: #2c3e50; }
        .message-email { color: #3498db; }
        .message-text { margin: 15px 0; padding: 15px; background: #f9f9f9; border-radius: 4px; }
        .message-actions { display: flex; gap: 10px; }
        .btn {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            font-size: 14px;
        }
        .btn-read { background: #2ecc71; color: #fff; }
        .btn-delete { background: #e74c3c; color: #fff; }
        .btn:hover { opacity: 0.8; }
        .ip { color: #95a5a6; font-size: 12px; }
        .badge {
            background: #e74c3c;
            color: #fff;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📬 Сообщения с сайта</h1>
        
        <?php
        $unread_count = array_filter($messages, function($m) { return !$m['is_read']; });
        ?>
        <div class="stats">
            <strong>Всего сообщений:</strong> <?= count($messages) ?> | 
            <strong>Непрочитанных:</strong> <?= count($unread_count) ?>
        </div>
        
        <?php if (empty($messages)): ?>
            <p>Пока нет сообщений</p>
        <?php else: ?>
            <?php foreach ($messages as $msg): ?>
                <div class="message <?= !$msg['is_read'] ? 'unread' : '' ?>">
                    <div class="message-header">
                        <div>
                            <span class="message-from"><?= htmlspecialchars($msg['name']) ?></span>
                            <?php if (!$msg['is_read']): ?>
                                <span class="badge">Новое</span>
                            <?php endif; ?>
                        </div>
                        <span class="message-date"><?= date('d.m.Y H:i', strtotime($msg['created_at'])) ?></span>
                    </div>
                    
                    <div class="message-email">📧 <?= htmlspecialchars($msg['email']) ?></div>
                    
                    <div class="message-text">
                        <?= nl2br(htmlspecialchars($msg['message'])) ?>
                    </div>
                    
                    <div class="ip">IP: <?= htmlspecialchars($msg['ip_address']) ?></div>
                    
                    <div class="message-actions">
                        <?php if (!$msg['is_read']): ?>
                            <a href="?mark_read=<?= $msg['id'] ?>" class="btn btn-read">✓ Отметить прочитанным</a>
                        <?php endif; ?>
                        <a href="?delete=<?= $msg['id'] ?>" class="btn btn-delete" onclick="return confirm('Удалить сообщение?')">🗑 Удалить</a>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</body>
</html>