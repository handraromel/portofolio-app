const nodemailer = require('nodemailer')
const { appConfig } = require('@api/config')

const { emailServer, emailServerPassword } = appConfig

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailServer,
            pass: emailServerPassword,
        },
    })
}

const sendVerificationEmail = (userEmail, verificationLink, logger) => {
    const transporter = createTransporter()

    const mailOptions = {
        from: `"No Reply" <${emailServer}>`,
        to: userEmail,
        subject: 'Verify Your Email',
        html: `
      <h1>Welcome to Our App!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
        replyTo: 'no-reply@gmail.com',
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                logger.error('Error sending verification email', { error })
                reject(new Error('Error sending verification email'))
            } else {
                resolve(`A verification link has been sent to ${userEmail}`)
            }
        })
    })
}

const sendPasswordResetEmail = (userEmail, newPassword, logger) => {
    const transporter = createTransporter()

    const mailOptions = {
        from: `"No Reply" <${emailServer}>`,
        to: userEmail,
        subject: 'Your new password',
        text: `Your new password is: ${newPassword}`,
        replyTo: 'no-reply@gmail.com',
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                logger.error('Error sending password reset email', { error })
                reject(new Error('Error sending password reset email'))
            } else {
                resolve(`New password has been sent to ${userEmail}`)
            }
        })
    })
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail }
