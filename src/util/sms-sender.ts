import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const client = twilio(accountSid, authToken)

export async function sendAuthCodeBySMS(phoneNumber: string, code: string) {
  await client.messages.create({
    body: `Verification code: ${code}`,
    messagingServiceSid: messagingServiceSid,
    to: phoneNumber,
  })
}
