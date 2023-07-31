import './App.css';
import React, { useState, useEffect } from "react"
import stubs from './defaultStubs'
import axios from "axios"
import moment from "moment"
import Editor, { loader } from "@monaco-editor/react";


function App() {

  loader.init().then((monaco) => {
    monaco.editor.defineTheme('myTheme', {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        background: '#282c34',
        text: '#abb2bf',
        variable: '#e06c75',
        attribute: '#d19a66',
        definition: '#e5c07b',
        keyword: '#c678dd',
        operator: '#56b6c2',
        property: '#56b6c2',
        number: '#d19a66',
        string: '#98c379',
        comment: '#5c6370',
        meta: '#abb2bf',
        tag: '#e06c75',
      }

    })//
  })



  const [code, setCode] = useState('') // The code from website (request)
  const [output, setOutput] = useState("") // basically output
  const [language, setLanguages] = useState("js") // js or py
  const [status, setStatus] = useState("") // To check status whether server is done the job or not
  const [jobId, setJobId] = useState("") // To get the Job ID
  const [jobDetails, setJobDetails] = useState(null)// This is for calculating time executtion



  useEffect(() => {
    const defaultLang = localStorage.getItem("default-language") || "js"
    setLanguages(defaultLang)
  }, [])

  useEffect(() => {
    setCode(stubs[language])
  }, [language])

  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language)
  }

  const renderTimeDetails = () => {
    if (!jobDetails) {
      return ""
    }
    let result = ''
    let { submittedAt, completedAt, startedAt } = jobDetails
    submittedAt = moment(submittedAt).toString()
    result += `Submitted At: ${submittedAt} `
    if (!completedAt || !startedAt) {
      return result
    }
    const start = moment(startedAt)
    const end = moment(completedAt)
    const executionTime = end.diff(start, 'seconds', true)
    result += `Execution Time: ${executionTime * 1000}ms`
    return result
  }

  const [testCases, setTestCases] = useState("")

  const handleSubmit = async () => {
    const payload = {
      language,
      code
    }
    try {
      // Take a look at these three "set". It usually causes infinite loops
      setJobId("")
      setOutput("")
      setStatus("")
      setJobDetails(null)
      const { data } = await axios.post("http://localhost:1000/run", payload)
      setJobId(data.jobId)
      let intervalId

      intervalId = setInterval(async () => {

        const { data: dataRes } = await axios.get("http://localhost:1000/status",
          { params: { id: data.jobId } }
        )
        const { success, job, error } = dataRes
        console.log(data)
        console.log(dataRes)
        if (success) {
          const { status: jobStatus, output: jobOutput } = job
          setStatus(jobStatus)
          setJobDetails(job)
          if (jobStatus === "pending") return
          setOutput(jobOutput)
          clearInterval(intervalId)
        } else {
          setStatus("Error: Please retry!")
          console.error(error)
          clearInterval(intervalId)
          setOutput(error)
        }
      }, 1000)
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr
        setOutput(errMsg)
        console.log(response)
      } else {
        setOutput("Error connecting to server!")
      }
    }

  }

  const handleTests = async () => {
    const payload = {
      language: "js",
      code
    }
    try {
      const { data } = await axios.post("http://localhost:1000/test", payload)
      setOutput(data.output)
      setTestCases(data.result)
    } catch (err) {
      console.log(err.response)
    }
  }


  return (
    <div className="App">
      <h1>Online code Compiler</h1>
      <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => {
            setLanguages(e.target.value)
            console.log(e.target.value)
          }}
        >
          <option value="js">Js</option>
          <option value="py">Python</option>
        </select>

      </div>
      <br />
      <div>
        <button onClick={setDefaultLanguage}>Set Default</button>
      </div>
      <br />

      <Editor theme="myTheme" id="container" height="10vh" width="80rem" defaultLanguage="javascript" />
      <br />
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={
          (e) => { setCode(e.target.value) }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Run</button>
      <button onClick={handleTests}>Test</button>
      <p>{status}</p>
      <p>{jobId && `jobId: ${jobId}`}</p>
      <p>{renderTimeDetails()}</p>
      <p>{output}</p>
      <p>{testCases}</p>
    </div>
  );
}

export default App;
