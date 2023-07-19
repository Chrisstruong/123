const fs = require("fs")
const path = require("path")


const testCases = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0]
    const { mostFrequentChar } = require(`./codes/${jobId}`)

    const input = ["bookeeper", "david", "abby"]
    const expectation = ["e", "d", "b"]

    for (let i = 0; i < input.length; i++) {
        if (mostFrequentChar(input[i]) === expectation[i]) console.log("PASS")
        else console.log(`expect: ${expectation[i]}\nactual: ${mostFrequentChar(input[i])}`)
    }
    return "PASS"
}


module.exports = {
    testCases,
}