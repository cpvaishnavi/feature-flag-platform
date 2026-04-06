import { useState } from "react"
import { loginUser, signupUser } from "./api"

function Login({ setToken }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)

  const handleSubmit = async () => {
  if (isSignup) {
    const res = await signupUser({ email, password })
    alert(res.message)

    setPassword("")      // ✅ clear password
    setIsSignup(false)   // ✅ switch to login
  } else {
    const res = await loginUser({ email, password })

    if (res.token) {
      localStorage.setItem("token", res.token)
      setToken(res.token)

      setPassword("")    // ✅ optional: clear after login
    } else {
      alert("Login failed")
    }
  }
}

  return (
    <div style={{ padding: 20 }}>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      <input
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  list="email-suggestions"
/>

<datalist id="email-suggestions">
  <option value={email} />
</datalist>

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <br /><br />

      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Go to Login" : "Create account"}
      </button>
    </div>
  )
}

export default Login