const express = require("express")
const cors = require("cors")

const { generateFile } = require("./generateFile")
const { executeJs } = require("./executeJs")
const { testCases } = require("./testCases")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



// get route
app.get('/', (req, res) => {
    return res.json({ hello: "world!" })
})

app.post("/run", async (req, res) => {

    const { language = "js", code } = req.body

    if (code === undefined) {
        return res.status(400).json({ success: "false", error: "Empty code body" })
    }
    try {
        // need to generate a js file with content from the request
        const filepath = await generateFile(language, code)
        // We need to run the file and send the response
        const output = await executeJs(filepath)
        const result = await testCases(filepath)
        return res.json({ filepath, output, result })

    } catch (err) {
        res.status(500).json({ err })
    }
})

app.listen(1000, () => {
    console.log("listening on port 1000!")
})