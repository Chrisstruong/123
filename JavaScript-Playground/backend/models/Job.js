const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: ["js", "py"]
    },
    filepath: {
        type: String,
        required: true,
    }, 
    submittedAt: {
        type: Date,
        default: Date.now
    }, 
    startedAt: {
        type: Date,
    },
    compledtedAt: {
        type: Date,
    },
    output: {
        type: String,
    },
    status: {
        type: String, 
        default: "pending",
        enum: ["pending", "success",]
    },
})

const Job = mongoose.model("job", jobSchema)

module.exports = Job