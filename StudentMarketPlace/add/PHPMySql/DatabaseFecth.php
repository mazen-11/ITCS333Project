<?php
header('Content-Type: application/json');

    try {
        require_once 'databaseConn.php'; 

        $stmt = $pdo->query("SELECT * FROM products");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($products);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Failed to fetch products']);
    }

?>
