import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [url, setCount] = useState([]);
  const [shortenLInk, setshortenLInk] = useState([]);
  const getData = (e) => {
    setCount(e.target.value)
  }
  const send = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/url", {
        url
      }
      )
    } catch (error) {
      console.log("error occured ", error)
    }
    
  }
  const get = async()=>{
    const Data =  await axios.get("http://localhost:8000/")
      const {data} = Data;
      setshortenLInk(data.message)
  }
  return (

    <>
      <div>
        <form action="" method='post' onSubmit={send}>
          <input type="text" value={url} onChange={getData} />
          <button onClick={get}>Get ShortUrl</button>
        </form>
       <p> {shortenLInk}</p>
      </div>
    </>
  )
}

export default App
