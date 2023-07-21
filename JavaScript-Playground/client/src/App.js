import './App.css';
import React, { useState } from "react"
import axios from "axios"

function App() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState("")
  const [language, setLanguages] = useState("js")

  const [testCases, setTestCases] = useState("")

  const handleSubmit = async () => {
    const payload = {
      language,
      code
    }
    try {
      const { data } = await axios.post("http://localhost:1000/run", payload)
      setOutput(data.output)
    } catch ({response}) {
      if (response) {
        const errMsg = response.data.err.stderr
        setOutput(errMsg)
        console.log(response)
      }else {
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
      <p>{output}</p>
      <p>{testCases}</p>
    </div>
  );
}

export default App;
