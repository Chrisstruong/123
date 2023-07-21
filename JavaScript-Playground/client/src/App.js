import './App.css';
import React, { useState } from "react"
import axios from "axios"

function App() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState("")
  const [testCases, setTestCases] = useState("")

  const handleSubmit = async () => {
    const payload = {
      language: "js",
      code
    }
    try {
      const { data } = await axios.post("http://localhost:1000/run", payload)
      console.log(data)
      setOutput(data.output)
      setTestCases(data.result)
    } catch (err) {
      console.log(err.response)
    }

  }



  return (
    <div className="App">
      <h1>Online code Compiler</h1>
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={
          (e) => { setCode(e.target.value) }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
      <p>{testCases}</p>
    </div>
  );
}

export default App;
