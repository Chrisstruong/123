// first function
const fs = require("fs")
const path = require("path")
const  { v4: uuid } = require("uuid")

const dirCodes = path.join(__dirname, "codes")
// dirCode = /backend/codes
// __dirname: parent directory( /backend)
// path.join to create a directory or file

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive: true})
}

// Create a directory is easier than create a file because a file must have content.

const generateFile = async (format, content) => {
    const jobId = uuid()
    const filename = `${jobId}.${format}`
    const filepath = path.join(dirCodes, filename)
    // filepath: /backend/codes/"jobId".js
    await fs.writeFileSync(filepath, content)
    // writeFileSync has 2 factors:
    // 1) Where the file is located
    // 2) the content of it

    // writeFile will depend on the input, input changes, writeFile changes
    // appendFile will add new input to the previous one. Totally different to writeFile
    return filepath
}


module.exports = {
    generateFile,
}