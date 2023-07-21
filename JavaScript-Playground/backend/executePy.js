const { rejects } = require("assert")
const { exec } = require("child_process")
const { error } = require("console")
const fs = require("fs")
const path = require("path")
const { stdout, stderr } = require("process")

const executePy = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(
            `python ${filepath}`, 
            (error, stdout, stderr) => {
                error && reject({error, stderr})
                stderr && reject(stderr)
                resolve(stdout)
            }
        )
    })
}

module.exports = {
    executePy,
}