exports.log = (message, error = null) => {
    if (error) {
        console.error(`${message}:`, error);
    } else {
        console.log(message);
    }
};
