const nodemailer = require('nodemailer')
const user = require('../databases/user')
async function sendMailToUserMail (userMail, resetCode) {
  try {
    console.log('test', userMail)
    const transporter = nodemailer.createTransport({
      service: 'smtp',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'tserensodnom.t',
        pass: 'mongol123'
      }
    })
    console.log('test12')
    const response = await transporter.sendMail({
      from: 'tserensodnom.t@gmail.com',
      to: 'hagoc40041@soulsuns.com',
      subject: 'Change Password',
      text: 'resetCode'
    })
    return response
  } catch (err) {
    return err.message
  }
}
module.exports = { sendMailToUserMail }
