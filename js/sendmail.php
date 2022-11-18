<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exeption;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language');
    $mail->IsHTML(true);

    $mail->setFrom('info@antifreeze.ru', 'Антифриз');
    $mail->addAddress('panechek@inbox.ru');
    $mail->Subject = 'Заказ';

    $body = '<h1>Поступил новый заказ</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['gender']))){
        $body.='<p><strong>Пол:</strong> '.$_POST['gender'].'</p>';
    }

    if(trim(!empty($_POST['age']))){
        $body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
    }

    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    if (!empty($_FILES['image']['tmp_name'])) {
        $filePath = __DIR__ . "/files/" . $FILES['image']['name'];
        
        if (copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении.</strong>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    if (!$mail->semd()) {
        $message = 'Ошибка';

    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>