<?php
if (!defined('UPLOAD_SQL_INCLUDED')) {
    define('UPLOAD_SQL_INCLUDED', true);

    require_once("UserInputCheck.php");

    function EditPro($UserInputArray) {
        try {
            require_once("databaseConn.php");
            
            // Check if ID exists
            if (ProductIdCheck(input_test($UserInputArray['id']))) {
                $id = input_test($UserInputArray['id']);
                $name = input_test($UserInputArray['name']);
                $price = input_test($UserInputArray['price']);
                $shortDescription = input_test($UserInputArray['shortDescription']);
                $detailedDescription = input_test($UserInputArray['detailedDescription']);
                
                $updateSuccessful = false; // Track if any update was successful
                
                // Update name if provided
                if (!empty($name)) {
                    $sql = "UPDATE products SET name = :name WHERE ID = :id";
                    $rs = $GLOBALS['pdo']->prepare($sql);
                    $params = [
                        ':id' => $id,
                        ':name' => $name
                    ];
                    $rs->execute($params);
                    $updateSuccessful = true;
                }
                
                // Update price if provided
                if (!empty($price)) {
                    $sql = "UPDATE products SET price = :price WHERE ID = :id";
                    $rs = $GLOBALS['pdo']->prepare($sql);
                    $params = [
                        ':id' => $id,
                        ':price' => $price
                    ];
                    $rs->execute($params);
                    $updateSuccessful = true;
                }
                
                // Update short description if provided
                if (!empty($shortDescription)) {
                    $sql = "UPDATE products SET shortDescription = :shortDescription WHERE ID = :id";
                    $rs = $GLOBALS['pdo']->prepare($sql);
                    $params = [
                        ':id' => $id,
                        ':shortDescription' => $shortDescription
                    ];
                    $rs->execute($params);
                    $updateSuccessful = true;
                }
                
                // Update detailed description if provided
                if (!empty($detailedDescription)) {
                    $sql = "UPDATE products SET detailedDescription = :detailedDescription WHERE ID = :id";
                    $rs = $GLOBALS['pdo']->prepare($sql);
                    $params = [
                        ':id' => $id,
                        ':detailedDescription' => $detailedDescription
                    ];
                    $rs->execute($params);
                    $updateSuccessful = true;
                }
                
                return $updateSuccessful;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            error_log('Connection failed: ' . $e->getMessage());
            return false;
        }
    }
}
?>
