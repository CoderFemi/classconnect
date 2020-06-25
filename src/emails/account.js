const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'olufemiagbebi@gmail.com',
        subject: 'Thanks for joining our website',
        text: `Welcome to the app, ${name}, Let me know about your experience on our website`
    })
}

const sendExitEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'olufemiagbebi@gmail.com',
        subject: 'Sorry to see you go.',
        text: `Hello, ${name}, we are sorry to see you go, please take some time out to tell us why.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendExitEmail
}