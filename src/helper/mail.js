const nodemailer = require('nodemailer')
// const user = require('../databases/user')
async function sendMailToUserMail (userMail, resetCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'smtp',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ttogether803@gmail.com',
        pass: 'cofmbexzbrjtytit'
      }
    })
    const response = await transporter.sendMail({
      from: 'ttogether803@gmail.com',
      to: userMail,
      subject: 'Change Password',
      text: `Reset Code: ${resetCode}`
    })
    return response
  } catch (err) {
    return err.message
  }
}
module.exports = { sendMailToUserMail }
