import nodemailer from "nodemailer";
import mailContent from "../emailTemplates/customerQuoteTemplate.js";

function sendEmail(email, subject, content, attachments, bcc) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_CONFIGS_EMAIL,
        pass: process.env.MAIL_CONFIGS_PW,
      },
      tls: {
        rejectUnauthorized:
          process.env.NODE_ENV === "development" ? false : true,
      },
    });

    let from = `${process.env.COMPANY_NAME} <${process.env.MAIL_CONFIGS_EMAIL}>`;
    const mailConfigs = {
      from: from,
      to: email,
      subject: subject,
      html: content,
      attachments: attachments,
      // {
      //   filename: attachments?.originalname || "",
      //   path: attachments?.path || "",
      // },
      bcc: bcc,
    };

    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: "An error encountered." });
      }

      return resolve({ message: "Email has been sent." });
    });
  });
}

export default sendEmail;
