function generateOTP() {
    // Declare a string variable to store the OTP
    let otp = "";

    // Loop through 6 times to generate each digit of the OTP
    for (let i = 0; i < 4; i++) {
        // Generate a random number between 0 and 9
        let digit = Math.floor(Math.random() * 10);
        // Append the digit to the OTP string
        otp += digit;
    }

    // Return the OTP
    return otp;
}
module.exports = generateOTP;
