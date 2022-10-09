const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: async (obj) => {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tuanprogrammer001@gmail.com",
        pass: "omwxmnslfaiifliz",
      },
    });

    const message = {
      from: "tuanprogrammer001@gmail.com",
      to: obj.to,
      subject: obj.subject,
      text: obj.message,
    };

    await transport.sendMail(message);
  },
};
