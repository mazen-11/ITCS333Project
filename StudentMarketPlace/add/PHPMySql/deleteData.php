<?php
if (!defined('UPLOAD_SQL_INCLUDED')) {
    define('UPLOAD_SQL_INCLUDED', true);

    require_once("UserInputCheck.php");

    function DeletePro($UserInputArray) {
        try {
            require_once("databaseConn.php"); // Changed to require_once
            if (ProductIdCheck(input_test($UserInputArray['id']))) {
                $sql = "DELETE FROM products WHERE ID = :id";
                $rs = $GLOBALS['pdo']->prepare($sql);
                $params = [ ':id' => $UserInputArray['id'] ];
                
                // Execute the query - THIS LINE IS WHAT YOU NEED TO ADD
                $rs->execute($params);
                return true; // Return true on success
                
            }
            
            return false;
        } catch (PDOException $e) {
            error_log('Connection failed: ' . $e->getMessage());
            return false;
        }
    }
}
?>