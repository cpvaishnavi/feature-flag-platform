const BASE_URL = "http://localhost:3000"

export const getFlags = async (token) => {
  const res = await fetch(`${BASE_URL}/flags`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}

export const createFlag = async (token, data) => {
  const res = await fetch(`${BASE_URL}/flags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const toggleFlag = async (token, name) => {
  const res = await fetch(`${BASE_URL}/flags/${name}/toggle`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const signupUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const getProjects = async () => {
  const res = await fetch(
    `${BASE_URL}/projects`
  )

  return res.json()
}

export const createProject = async (data) => {
  const res = await fetch(
    `${BASE_URL}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )

  return res.json()
}