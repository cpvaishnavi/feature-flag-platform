import { useEffect, useState } from "react"
import { getFlags, createFlag, toggleFlag } from "./api"

function App() {
  const [flags, setFlags] = useState([])
  const [name, setName] = useState("")
  const [rollout, setRollout] = useState(0)
  const [token, setToken] = useState("")

  // 🔥 Ask for token ONLY once
  useEffect(() => {
    const savedToken = localStorage.getItem("token")

    if (savedToken) {
      setToken(savedToken)
    } else {
      const input = prompt("Enter your token")
      if (input) {
        localStorage.setItem("token", input)
        setToken(input)
      }
    }
  }, [])

  const loadFlags = async () => {
    const data = await getFlags(token)
    setFlags(data)
  }

  // 🔥 Load flags only after token is ready
  useEffect(() => {
    if (token) {
      loadFlags()
    }
    // eslint-disable-next-line
  }, [token])

  const handleCreate = async () => {
  if (!name || !token) return

  const res = await createFlag(token, { name, rollout })
  console.log("CREATE RESPONSE:", res)

  setName("")
  setRollout(0)

  await loadFlags()
}

  const handleToggle = async (flagName) => {
    await toggleFlag(token, flagName)
    loadFlags()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Feature Flag Dashboard</h1>

      {/* CREATE FLAG */}
      <h3>Create Flag</h3>
      <input
        placeholder="Flag name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Rollout %"
        value={rollout}
        onChange={(e) => setRollout(Number(e.target.value))}
      />

      <button onClick={handleCreate}>Create</button>

      {/* SHOW FLAGS */}
      <h3>Flags</h3>
      {flags.map((flag) => (
        <div key={flag.id} style={{ marginBottom: 10 }}>
          <strong>{flag.name}</strong> — {flag.rollout}% —{" "}
          {flag.isActive ? "ON" : "OFF"}

          <button onClick={() => handleToggle(flag.name)}>
            Toggle
          </button>
        </div>
      ))}
    </div>
  )
}

export default App