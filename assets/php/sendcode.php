<?php

require_once 'sms.auth.class.php';

$authCode = new \TargetSMS\SmsAuth(
    'логин',// логин в системе TargetSMS
    'пароль'// пароль в системе TargetSMS
);

try {
    $result = $authCode->generateCode(
        'телефон',// номер телефона получателя
        'подпись',// подпись отправителя
        4,// длина кода
        'Код авторизации: {код}'// текст персонификации
    );
    $code = $result->success->attributes()['code'];// сгенерированный код 
    $id_sms = $result->success->attributes()['id_sms'];// id смс для проверки статуса доставки
    $status = $result->success->attributes()['status'];// статус доставки
    var_dump($result);
} catch (Exception $e) {
    $error = $e->getMessage();//ловим ошибку от сервера
    var_dump($error);
}