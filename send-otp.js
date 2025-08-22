// netlify/functions/send-otp.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Netlify Functions are triggered by HTTP events, so we check the method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only POST requests are allowed' }),
    };
  }

  const EMAIL_USER="greonxpert@gmail.com"
const EMAIL_PASS="afedcqpmtotaghet"
  try {
    const { email, otp } = JSON.parse(event.body);

    if (!email || !otp) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email and OTP are required.' }),
      };
    }

    // Use environment variables securely
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Carbeez App" <${EMAIL_USER}>`,
      to: email,
      subject: 'Your Carbeez Login OTP',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send OTP.', error: error.message }),
    };
  }
};