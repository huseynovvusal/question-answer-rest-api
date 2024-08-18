import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

const sendEmail = async (mailOptions: Mail.Options) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT as string),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  let info = await transporter.sendMail(mailOptions)

  console.log(`Message is sent: ${info.messageId}`)
}

export default sendEmail
