import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

config();

const app = express();

app.use(cors());

const transporter: Transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
} as SMTPTransport.Options );

app.post("/api/send-mail", (req, res) => {
  transporter
    .sendMail({
      from: process.env.SMTP_MAIL_SENDER,
      to: "tanmayvaij22@gmail.com",
      subject: "Test mail",
      text: "This is a test mail",
    })
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(process.env.FLEXIBASE_MAILER_EXPOSE_PORT, () => {
  console.log(
    `FlexiBase Mailer started successfully on port ${process.env.FLEXIBASE_MAILER_EXPOSE_PORT}`
  );
});
