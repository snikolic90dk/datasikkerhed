<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

$resultatMappe = __DIR__ . '/resultater';

try {
    if (!file_exists($resultatMappe)) {
        if (!mkdir($resultatMappe, 0777, true)) {
            throw new Exception('Kunne ikke oprette mappe');
        }
    }

    if (!is_writable($resultatMappe)) {
        throw new Exception('Mappen er ikke skrivbar');
    }

    $jsonData = file_get_contents('php://input');
    if ($jsonData === false) {
        throw new Exception('Kunne ikke læse input data');
    }

    $data = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Ugyldig JSON: ' . json_last_error_msg());
    }

    if (empty($data['id'])) {
        throw new Exception('Manglende ID i data');
    }

    $filnavn = $resultatMappe . '/' . preg_replace('/[^a-zA-Z0-9-_\.]/', '', $data['id']) . '.json';
    
    if (file_put_contents($filnavn, $jsonData) === false) {
        throw new Exception('Kunne ikke skrive fil');
    }

    echo json_encode([
        'success' => true,
        'besked' => 'Resultat gemt',
        'sti' => $filnavn
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'fejl' => $e->getMessage()
    ]);
}
?>