const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

const useMailer = (userEmail, newPassword, response, logger) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: processEnv.EMAIL,
            pass: processEnv.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: `"No Reply" <${processEnv.EMAIL}>`,
        to: userEmail,
        subject: 'Your new password',
        text: `Your new password is: ${newPassword}`,
        replyTo: 'no-reply@gmail.com',
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            logger.error('Error sending email', { error })
            return response.status(500).json({ msg: 'Error sending email' })
        }
        response.json({ msg: 'New password has been sent to your email' })
    })
}

module.exports = useMailer
