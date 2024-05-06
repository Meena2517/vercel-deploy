// controller.js
const nodemailer = require("nodemailer");

// Create an SMTP transporter (use your email service)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "revanthpatnani@gmail.com",
    pass: "ylsw pzpk aobz fche",
  },
});

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

// Store OTPs temporarily (in-memory) for verification
const otpStorage = new Map();

exports.sendOTP = async (email) => {
  try {
    // Generate a random OTP
    const otp = generateOTP();

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    // Send OTP email
    const info = await transporter.sendMail(mailOptions);

    // Store OTP in memory for verification
    otpStorage.set(email, otp);

    return { success: true, info: info.response };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send OTP");
  }
};

exports.verifyOTP = (email, userOTP) => {
  const storedOTP = otpStorage.get(email);
  if (storedOTP && userOTP === storedOTP.toString()) {
    // OTP is valid
    otpStorage.delete(email); // Remove OTP from storage after successful verification
    return { success: true };
  } else {
    return { success: false, message: "Invalid OTP" };
  }
};



exports.sendFeedback = async (email, name, content) => {
  try {
    const mailOptions = {
      from: "revanthpatnani@gmail.com",
      to: "revanthpatnani@gmail.com",
      subject: "Feedback",
      text: `Name: ${name}\nEmail: ${email}\nMessgae: ${content}`,
    };    
    // Send OTP email
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info: info.response };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send OTP");
  }
};
