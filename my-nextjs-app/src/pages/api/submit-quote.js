import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    console.log("Request Method:", req.method);

    // Check if the method is POST
    if (req.method !== "POST") {
      console.log("❌ Method Not Allowed");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    console.log("✅ Allowed method, processing...");

    // Log request body
    console.log("Request Body:", req.body);

    const { movingFrom, movingTo, message } = req.body;

    // Check if all required fields are present
    if (!movingFrom || !movingTo || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      console.log(process.env.EMAIL_USER);
      console.log(process.env.EMAIL_PASS);
      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY, // Store this in .env
        },
      }); 

      // Email options
      const mailOptions = {
        from: "ashish.k.php@gmail.com", // Must be a verified sender in SendGrid
        to: "ashish.k.php@gmail.com", // Recipient's email
        subject: "New Moving Quote Request",
        text: `Moving From: ${movingFrom}\nMoving To: ${movingTo}\nMessage: ${message}`,
      };

      // Send email (using await)
      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "Form submitted successfully!!!!" });
    } catch (error) {
      console.error("🚨 Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } catch (error) {
    console.error("🚨 Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
