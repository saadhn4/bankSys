import twilio from "twilio";
import config from "config";

const sid = config.get("SID");
const token = config.get("TOKEN");
const phone = config.get("PHONE");

let client = new twilio(sid, token);

async function sendSMS(smsData) {
  try {
    await client.messages.create({
      to: smsData.to,
      body: smsData.body,
      from: phone,
    });
    console.log(`SMS Sent.`);
  } catch (error) {
    console.log(error);
  }
}

// let obj = { to: "+919030358367", body: `https://google.com` };

// sendSMS(obj);

export default sendSMS;
