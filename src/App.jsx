import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+|}{:/*-+.,/;'`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordTpClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }, [password])

  useEffect(() => {passwordGenerator()}, [length,numberAllowed,charAllowed,passwordGenerator])

  const passwordRef = useRef(null)

  return (
    <>
      <div className="container h1 text-center mt-5 text-light">
        Password Generator
      </div>

      <div className="container">
        <div className="container text-center mt-5 w-50 rounded" style={{backgroundColor:"grey"}}>

          <div className="container">
            <input type="text" className="mx-2 my-3 px-2 py-2 rounded w-50 mt-5" value={password} placeholder="Password" readOnly ref={passwordRef} />
            <button className="btn btn-outline-light py-2 px-3 mb-1" onClick={copyPasswordTpClipboard}>COPY</button>
          </div>
          <div className="container mt-3">
            <input type="range" min={5} max={50} className="me-3" value={length} onChange={(e) => {setLength(e.target.value)}} />
            <label className="h5 text-light me-3">Length: {length}</label>
            <input type="checkbox" id="check1" defaultChecked={numberAllowed} onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} />
            <label htmlFor="check1" className="h5 text-light me-3">Numbers</label>
            <input type="checkbox" id="check2" className="mb-5" defaultChecked={charAllowed} onChange = {() => 
              setCharAllowed((prev) => !prev)} />
            <label htmlFor="check2" className="h5 text-light">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
