<?php
if (!defined('UPLOAD_SQL_INCLUDED')) {
    define('UPLOAD_SQL_INCLUDED', true);

    require_once("UserInputCheck.php");

    function AddPro($UserInputArray) {
        try {
            require_once("databaseConn.php");
            
            // Detailed logging of input
            error_log('Input Array: ' . print_r($UserInputArray, true));
            
            // Check if array elements are valid
            if (checkArrayElements($UserInputArray)) {
                $id = input_test($UserInputArray['ID']);
                $date = input_test($UserInputArray['Date']);
                $comment = input_test($UserInputArray['Comment']);
                
                // Log processed values
                error_log("Processed Values - ID: $id, Date: $date, Comment: $comment");
                
                // Validate inputs
                if (empty($id) || empty($date) || empty($comment)) {
                    error_log('One or more input values are empty');
                    return false;
                }
                
                // Prepare SQL statement
                $sql = "INSERT INTO `product_comments` 
                       (product_id, comment, comment_date)
                       VALUES (:id, :comment, :date)";
                
                // Log the SQL statement
                error_log("SQL Statement: $sql");
                
                // Prepare the statement
                $rs = $GLOBALS['pdo']->prepare($sql);
                
                // Parameters for binding
                $params = [
                    ':id' => $id,
                    ':comment' => $comment,
                    ':date' => $date
                ];
                
                // Log parameters
                error_log('Bind Params: ' . print_r($params, true));
                
                // Execute and check result
                try {
                    $result = $rs->execute($params);
                    
                    // Log execution result
                    if ($result) {
                        error_log('Query executed successfully');
                    } else {
                        // Get detailed error info
                        $errorInfo = $rs->errorInfo();
                        error_log('Execute Error: ' . print_r($errorInfo, true));
                    }
                    
                    return $result;
                } catch (PDOException $e) {
                    // Catch and log any execution errors
                    error_log('Execution Error: ' . $e->getMessage());
                    return false;
                }
            } else {
                error_log('Array elements check failed');
                return false;
            }
        } catch (PDOException $e) {
            // Catch and log any general PDO errors
            error_log('PDO Error: ' . $e->getMessage());
            return false;
        }
    }
}
?>
