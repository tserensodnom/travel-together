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
        pass: 'mongol123'
      }
    })
    const response = await transporter.sendMail({
      from: 'ttogether803@gmail.com',
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
