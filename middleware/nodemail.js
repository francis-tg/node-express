// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

SendMail = (to,subject, message)=>{
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')
  //process.env.SENDGRID_API_KEY)
const msg = {
  to: to, // Change to your recipient
  from: 'francisalaphia5@gmail.com', // Change to your verified sender
  subject: subject,
  //text: 'and easy to do anywhere, even with Node.js',
  html: message,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}
module.exports = SendMail