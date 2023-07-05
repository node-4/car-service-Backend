exports.createResponse = (res, statusCode, message = "", data = null) => {
    const status = statusCode >= 200 && statusCode < 300 ? true : false; // Check if status code is in the 200s
    return res.status(statusCode).json({
        success: status, // Add a "status" field to the response object
        message: message,
        data: data,
    });
};
