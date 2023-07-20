const { count } = require("console")
const fs = require("fs")
const path = require("path")


const testCases = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0]
    const { mostFrequentChar } = require(`./codes/${jobId}`)
    let countPass = 0

    const input = ["bookeeper", "david", "abby"]
    const expectation = ["e", "d", "bd"]

    for (let i = 0; i < input.length; i++) {
        if (mostFrequentChar(input[i]) === expectation[i])  countPass++
    }

    return `${countPass}/3 PASSES`
}


module.exports = {
    testCases,
}