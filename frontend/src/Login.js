import { useState } from "react"
import { loginUser } from "./api"

function Login({ setToken }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await loginUser({ email, password })

    if (res.token) {
      localStorage.setItem("token", res.token)
      setToken(res.token)
    } else {
      alert("Login failed")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login