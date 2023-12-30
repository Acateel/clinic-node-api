import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: +process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
})

export async function sendAuthCode(code: string, emailTo: string) {
  const info = await transport.sendMail({
    from: 'Clinic node api',
    to: emailTo,
    subject: 'Authorization by sended code',
    html: `<p>Sended code: <b>${code}</b> </p>`,
  })
}
