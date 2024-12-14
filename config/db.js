if (process.env.NODE_ENV == "production") {
    module.exports = { MONGO_URI: process.env.MONGO_URI }
} else {
    module.exports = { MONGO_URI: "mongodb://localhost/blogapp" }
}