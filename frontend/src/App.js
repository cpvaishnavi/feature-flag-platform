import { useEffect, useState } from "react"
import { getFlags, createFlag, toggleFlag } from "./api"
import Login from "./Login"

function App() {
  const [flags, setFlags] = useState([])
  const [name, setName] = useState("")
  const [rollout, setRollout] = useState(0)
  const [token, setToken] = useState("")

  
  // ✅ Get token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) setToken(savedToken)
  }, [])

  const loadFlags = async () => {
    try {
      const data = await getFlags(token)

      if (Array.isArray(data)) {
        setFlags(data)
      } else {
        console.error("Invalid response:", data)
        setFlags([])
      }
    } catch (err) {
      console.error(err)
      setFlags([])
    }
  }

  // ✅ Load flags only when token exists
  useEffect(() => {
    if (token) {
      loadFlags()
    }
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

  const handleLogout = () => {
  localStorage.removeItem("token")
  setToken("")
}

  // 🔐 IMPORTANT: show login if no token
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1>Feature Flag Dashboard</h1>
  <button onClick={handleLogout}>Logout</button>
</div>

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

      <h3>Flags</h3>
      {Array.isArray(flags) && flags.map((flag) => (
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