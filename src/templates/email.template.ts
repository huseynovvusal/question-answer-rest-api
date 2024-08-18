export const resetPasswordEmailTemplate = (resetPasswordURL: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff !important;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://images.pexels.com/photos/1062249/pexels-photo-1062249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Password Reset">
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password. If you didn't request this change, please ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <a href="${resetPasswordURL}" class="button">Reset Password</a>
        <p>If the button doesn't work, you can copy and paste the following URL into your browser:</p>
        <p><a href="${resetPasswordURL}">${resetPasswordURL}</a></p>
        <p class="footer"><b>For your security, this link will expire in 10 minutes.</b> After it expires, you'll need to request a new password reset.</p>
        <p class="footer">If you have any questions or need further assistance, please contact our support team at [Support Email].</p>
        <p class="footer">Thank you,<br>The [Your Company/Website Name] Team</p>
    </div>
</body>
</html>
`
}
