const { exec } = require("child_process")
const { error } = require("console")
const fs = require("fs")
const path = require("path")
const { stdout, stderr } = require("process")


const outputPath = path.join(__dirname, "outputs")

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
}

const executeJs = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0]
    const outPath = path.join(outputPath, `${jobId}.out`)
    return new Promise((resolve, reject) => {
        console.log(`node ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.js`)
        exec(`node ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.js`, 
        (error, stdout, stderr) => {
            error && reject({error, stderr})
            stderr && reject(stderr)
            resolve(stdout)
        })
    })
}

module.exports = {
    executeJs,
}