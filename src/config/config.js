module.exports = {
    dbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/SSG',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
};
