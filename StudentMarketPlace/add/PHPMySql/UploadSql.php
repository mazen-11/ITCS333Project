<?php
if (!defined('UPLOAD_SQL_INCLUDED')) {
    define('UPLOAD_SQL_INCLUDED', true);

    require_once("UserInputCheck.php");

    function AddPro($UserInputArray) {
        try {
            require_once("databaseConn.php"); // Changed to require_once
            $path = '';
            
            if (checkArrayElements($UserInputArray)) {
                if (!ProductIdCheck(input_test($UserInputArray['ID']))) {
                    $id = input_test($UserInputArray['ID']);
                    $name = input_test($UserInputArray['name']);
                    $ProductType = $UserInputArray['ProductType'];
                    $price = input_test($UserInputArray['price']);
                    $shortDescription = input_test($UserInputArray['shortDescription']);
                    $detailedDescription = input_test($UserInputArray['detailedDescription']);
                    
                    // Assign default image based on product type
                    switch ($ProductType) {
                        case 'service':
                            $path = 'https://r2.erweima.ai/i/A3HiUF23SM6V6DFi5jGYrw.png';
                            break;
                        case 'product':
                            $path = 'https://cdn.create.vista.com/downloads/0d30a8f9-5148-4e68-8e01-99258835b87f_1024.jpeg';
                            break;
                        case 'notesforsale':
                            $path = 'https://m.media-amazon.com/images/I/61f9psB4QxL._SY466_.jpg';
                            break;
                        case 'Privateteacher':
                            $path = 'https://www.myprivatetutor.bh/public/frontend/images/landing_pages/small/learner_illustration_small.png?v=1689915397';
                            break;
                    }
                    
                    // Use parameterized query to prevent SQL injection
                    $sql = "INSERT INTO `products` 
                        (ID, name, ProductType, price, shortDescription, detailedDescription, image)
                        VALUES (:id, :name, :ProductType, :price, :shortDescription, :detailedDescription, :path)";

                    $rs = $GLOBALS['pdo']->prepare($sql);
                    $params = [
                        ':id' => $id,
                        ':name' => $name,
                        ':ProductType' => $ProductType,
                        ':price' => $price,
                        ':shortDescription' => $shortDescription,
                        ':detailedDescription' => $detailedDescription,
                        ':path' => $path
                    ];
                    
                    if ($rs->execute($params)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return false;
        } catch (PDOException $e) {
            error_log('Connection failed: ' . $e->getMessage());
            return false;
        }
    }
}

?>








