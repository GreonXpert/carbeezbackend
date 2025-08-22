// api/send-otp.js
const nodemailer = require('nodemailer');

export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { email, otp } = request.body;

  if (!email || !otp) {
    return response.status(400).json({ message: 'Email and OTP are required.' });
  }

  // Use Environment Variables for security. Do NOT hardcode your password here.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Or your email provider's SMTP server
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email app password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Carbeez App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Carbeez Login OTP',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Failed to send OTP.' });
  }
}