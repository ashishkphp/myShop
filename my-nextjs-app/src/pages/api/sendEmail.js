import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { movingFrom, movingTo, message } = req.body;

  // Configure nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "ashish.k.php@gmail.com", // Replace with the target email
      subject: "New Moving Quote Request",
      html: `
        <h3>New Moving Quote Request</h3>
        <p><strong>Moving From:</strong> ${movingFrom}</p>
        <p><strong>Moving To:</strong> ${movingTo}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: "Error sending email." });
  }
}
