const { exec } = require("child_process")

const executeJs = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`node ${filepath}`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr })
                stderr && reject(stderr)
                resolve(stdout)
            })
    })
}
// `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`
// The reason why we do not need to create OUTPUT file because JS doesnt need it while C++ does
module.exports = {
    executeJs,
}