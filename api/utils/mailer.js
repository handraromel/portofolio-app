const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: processEnv.EMAIL,
            pass: processEnv.EMAIL_PASSWORD,
        },
    })
}

const sendVerificationEmail = (userEmail, verificationLink, response, logger) => {
    const transporter = createTransporter()

    const mailOptions = {
        from: `"No Reply" <${processEnv.EMAIL}>`,
        to: userEmail,
        subject: 'Verify Your Email',
        html: `
      <h1>Welcome to Our App!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
        replyTo: 'no-reply@gmail.com',
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            logger.error('Error sending verification email', { error })
            return response.status(500).json({ msg: 'Error sending verification email' })
        }
    })
}

const sendPasswordResetEmail = (userEmail, newPassword, response, logger) => {
    const transporter = createTransporter()

    const mailOptions = {
        from: `"No Reply" <${processEnv.EMAIL}>`,
        to: userEmail,
        subject: 'Your new password',
        text: `Your new password is: ${newPassword}`,
        replyTo: 'no-reply@gmail.com',
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            logger.error('Error sending password reset email', { error })
            return response.status(500).json({ msg: 'Error sending password reset email' })
        }
        response.json({ msg: `New password has been sent to ${userEmail}` })
    })
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail }
