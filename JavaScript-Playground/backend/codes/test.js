const {mostFrequentChar} = require('./2ed10d59-f126-49c2-9627-9a31825ffdf0')

const input = ["bookeeper", "david", "abby"]
const expectation = ["e", "d", "123"]

for (let i = 0; i < input.length; i++) {
    if (mostFrequentChar(input[i]) === expectation[i]) console.log("PASS")
    else console.log(`expect: ${expectation[i]}\nactual: ${mostFrequentChar(input[i])}`)
}


