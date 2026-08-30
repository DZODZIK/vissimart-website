<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

if (!empty($_POST['website'])) {
  echo json_encode(['ok' => true]);
  exit;
}

function clean_header($s) {
  $s = str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', (string) $s);
  return trim($s);
}

$name = clean_header($_POST['name'] ?? '');
$email = clean_header($_POST['email'] ?? '');
$subjectKey = clean_header($_POST['subject'] ?? '');
$message = trim((string) ($_POST['message'] ?? ''));
$consent = !empty($_POST['consent']);

if ($name === '' || $email === '' || $message === '' || !$consent) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Vyplňte všetky polia a potvrďte súhlas.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 180 || strlen($name) > 120) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Neplatný e-mail alebo meno.']);
  exit;
}

if (strlen($message) > 5000) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Správa je príliš dlhá.']);
  exit;
}

$subjects = [
  'commission' => 'Objednávka na mieru',
  'print' => 'Print',
  'interest' => 'Záujem o originál',
];
$subjectLabel = $subjects[$subjectKey] ?? 'Správa z webu';

$to = 'vissimartsk@gmail.com';
$from = 'info@vissimart.sk';

$mailSubject = 'Vissimart: ' . $subjectLabel . ' – ' . $name;
$encodedSubject = '=?UTF-8?B?' . base64_encode($mailSubject) . '?=';

$body  = "Nová správa z webu vissimart.sk\n\n";
$body .= "Meno: {$name}\n";
$body .= "E-mail: {$email}\n";
$body .= "Predmet: {$subjectLabel}\n\n";
$body .= "Správa:\n{$message}\n";

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'From: Vissimart web <' . $from . '>',
  'Reply-To: ' . $name . ' <' . $email . '>',
  'X-Mailer: Vissimart-web',
];

$ok = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $from);

if ($ok) {
  echo json_encode(['ok' => true]);
  exit;
}

http_response_code(500);
echo json_encode([
  'ok' => false,
  'error' => 'Správu sa nepodarilo odoslať. Napíšte na vissimartsk@gmail.com.',
]);
