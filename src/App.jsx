import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberIncluded, setNumberIncluded] = useState(false)
  const [charIncluded, setCharIncluded] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numberIncluded) str += '0123456789'
    if (charIncluded) str += '!@#$%^&*()_+[]{}|;:,.<>?'
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomIndex)
    }
    setPassword(pass)
  }, [length, numberIncluded, charIncluded])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 21)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, numberIncluded, charIncluded, generatePassword])

  return (
    <>
      <div className="w-full max-w-lg mx-auto my-12 p-6 bg-gray-900 text-orange-400 rounded-2xl shadow-lg">
        <h1 className="text-white text-center text-3xl font-semibold mb-8">🔐 Password Generator</h1>

        <div className="flex items-stretch bg-gray-700 rounded-md overflow-hidden shadow mb-6">
  <input
    type="text"
    value={password}
    className="flex-grow p-3 bg-gray-700 text-white outline-none placeholder:text-gray-400 rounded-l-md"
    placeholder="Generated Password"
    readOnly
    ref={passwordRef}
  />
  <button
    onClick={copyPasswordToClipBoard}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 transition-all duration-200 text-sm font-semibold rounded-r-md"
  >
    Copy
  </button>
</div>


        <div className="space-y-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <label htmlFor="length">Password Length: <span className="text-orange-400 font-semibold">{length}</span></label>
            <input
              id="length"
              type="range"
              min={8}
              max={20}
              value={length}
              className="w-1/2 cursor-pointer"
              onChange={(e) => setlength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput">Include Numbers</label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberIncluded}
              onChange={() => setNumberIncluded((prev) => !prev)}
              className="accent-orange-500 w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="charInput">Include Special Characters</label>
            <input
              type="checkbox"
              id="charInput"
              checked={charIncluded}
              onChange={() => setCharIncluded((prev) => !prev)}
              className="accent-orange-500 w-4 h-4"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
