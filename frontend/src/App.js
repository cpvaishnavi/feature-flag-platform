import { useEffect, useState } from "react"
import { getFlags, createFlag, toggleFlag } from "./api"
import Login from "./Login"

import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"

function App() {
  const [flags, setFlags] = useState([])
  const [name, setName] = useState("")
  const [rollout, setRollout] = useState(0)
  const [token, setToken] = useState("")
  const [page, setPage] = useState("dashboard")
  const [selectedProjectId, setSelectedProjectId] =
  useState(null)
  
  // ✅ Get token from localStorage
  useEffect(() => {
  const savedToken = localStorage.getItem("token")

  console.log("TOKEN:", savedToken)

  if (savedToken) setToken(savedToken)
}, [])

  const loadFlags = async () => {
    try {
      const data = await getFlags(token)
console.log(
  "FLAGS FROM API:",
  JSON.stringify(data, null, 2)
)

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
    // eslint-disable-next-line
  }, [token])

  const handleCreate = async () => {
    if (
  !name ||
  !token ||
  !selectedProjectId
)
  return
    console.log(
  "Creating feature with project:",
  selectedProjectId
)
    const res = await createFlag(token, {
      name,
      rollout,
      projectId: selectedProjectId
    })
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

  if (page === "projects") {
  return (
  <Projects
  page={page}
  setPage={setPage}
  selectedProjectId={selectedProjectId}
  setSelectedProjectId={setSelectedProjectId}
/>
)
}

return (
  <Dashboard
    onLogout={handleLogout}
    flags={flags}
    name={name}
    rollout={rollout}
    setName={setName}
    setRollout={setRollout}
    handleCreate={handleCreate}
    handleToggle={handleToggle}
    page={page}
    setPage={setPage}
    selectedProjectId={selectedProjectId}
  />
)
}

export default App