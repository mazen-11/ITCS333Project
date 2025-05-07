<?php
if (!defined('RANDOM_ID_INCLUDED')) {
    define('RANDOM_ID_INCLUDED', true);
    
    function generateRandomNumber() {
        return mt_rand(100000, 999999); // Using mt_rand for better randomness
    }
}
?>