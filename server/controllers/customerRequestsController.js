import expressAsync from "express-async-handler";
import sendEmail from "../util/sendEmail.js";
import output from "../emailTemplates/customerQuoteTemplate.js";
import { CONTACT_INFO } from "../constants/constants.js";

const reqQuote = expressAsync(async (req, res) => {
  const {
    productName,
    qty,
    customerName,
    emailAddress,
    contactNo,
    description,
    dueDate,
  } = req.body;

  const reqFile = req.file;

  try {
    const mailSubject = "Request for Quotation";
    const mailContent = output({
      customerName,
      contactNo,
      description,
      dueDate,
      productName,
      qty,
    });

    console.log(req.body);

    // const recipients = [emailAddress, CONTACT_INFO.emailAddress];
    const recipients = [emailAddress];
    let resultMsg = [];

    const emailPromise = recipients.map((recipient) => {
      return sendEmail(recipient, mailSubject, mailContent, reqFile)
        .then((resolve, reject) => {
          let msg = reject
            ? "Failed email for " + recipient
            : "Sent email to " + recipient;
          resultMsg.push(msg);
        })
        .catch((error) => {
          res.status(500);
          console.log(error);
          throw new Error("Error occured in submission.");
        });
    });

    Promise.all(emailPromise).then(() => {
      res.send({ message: resultMsg });
    });
  } catch (error) {
    res.json({ status: "FAILED", msg: error }).status(500);
    throw new Error("Error occured Sending email.");
  }
});

export { reqQuote };
