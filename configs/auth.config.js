require("dotenv").config();

module.exports = {
    secret: process.env.SECRET_KEY,
    accessTokenTime: process.env.ACCESS_TOKEN_TIME,
    refreshTokenTime: process.env.REFRESH_TOKEN_TIME,
};
