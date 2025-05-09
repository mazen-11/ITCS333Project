<?php


    function input_test($input) {
      if (!empty($input)) {
            $input = trim($input);
            $input = stripslashes($input);
            $input = htmlspecialchars($input);
            return $input;
        } else {
            return false; // Return false instead of dying
        }
    }  

    function checkArrayElements($array) {
        foreach ($array as $key => $value) {
            if (empty($value)) {
                return false; // An element is empty
            }
        }
        return true; // All elements have data
    }

    function ProductIdCheck($ProductId) {
        if (!$ProductId) return false;
        
        try {
            require_once("databaseConn.php"); // Changed to require_once
            $sql = "SELECT ID FROM `products` WHERE ID = :id";
            $stmt = $GLOBALS['pdo']->prepare($sql);
            $stmt->execute([':id' => $ProductId]);
            
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log('Connection failed: ' . $e->getMessage());
            return false;
        }
    }

?>