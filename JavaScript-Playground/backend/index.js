const express = require("express")

const { generateFile } = require("./generateFile")

const app = express() 

app.use(express.urlencoded({extended: true}))
app.use(express.json())


// get route
app.get('/', (req, res) => {
    return res.json({hello: "world!"})
})

app.post("/run", async (req, res) => {

    const {language = "js", code} = req.body

    if(code === undefined) {
        return res.status(400).json({success: "false", error: "Empty code body"})
    }

    // need to generate a js file with content from the request
    const filepath = await generateFile(language, code)
    // We need to run the file and send the response
    return res.json({filepath})
})

app.listen(1000, () => {
    console.log("listening on port 1000!")
})