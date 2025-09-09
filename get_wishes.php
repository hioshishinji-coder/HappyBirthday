<?php
require "db.php";

$result = $conn->query("SELECT name, message, created_at FROM wishes ORDER BY id DESC");
$wishes = [];
while ($row = $result->fetch_assoc()) {
    $wishes[] = $row;
}
echo json_encode($wishes, JSON_UNESCAPED_UNICODE);
?>
