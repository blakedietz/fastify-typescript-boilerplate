import nodemailer from 'nodemailer';
import aws from 'aws-sdk';

// configure AWS SDK
aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

export async function sendEmail({ email, subject, text }) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject,
        text,
        ses: {
          // optional extra arguments for SendRawEmail
          Tags: [
            {
              Name: 'tag-name',
              Value: 'tag-value',
            },
          ],
        },
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
          console.log(info.envelope);
          console.log(info.messageId);
        }
      },
    );
  });
}
