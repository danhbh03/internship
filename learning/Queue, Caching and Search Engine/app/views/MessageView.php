<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send Message</title>
    <link rel="stylesheet" href="../css/Message.css">
</head>
<body>
    <div class="container">
        <?php if (isset($annouce)): ?>
            <div class="annouce">
                <strong>Announcement:</strong>
                <?= htmlspecialchars($annouce) ?>
                <a href="./send">Okay</a>
            </div>
        <?php else:?>
            <h1>Send a Message</h1>
            <form action="/queue/send" method="POST">
                <!-- <div class="form-group">
                    <label for="recipient">Recipient:</label>
                    <input type="text" id="recipient" name="recipient" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" required>
                </div> -->
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
            <a href="../">Back</a>
        <?php endif; ?>

    </div>
</body>
</html>