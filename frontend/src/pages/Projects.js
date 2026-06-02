import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"

import {
  getProjects,
  createProject,
  getFlags,
  getEnvironments,
  createEnvironment
} from "../api"

function Projects({
  page,
  setPage,
  selectedProjectId,
  setSelectedProjectId
}) {
  const [projectName, setProjectName] = useState("")

  const [projects, setProjects] = useState([])

  const [flags, setFlags] = useState([])

  const [selectedProject, setSelectedProject] =
  useState(null)

  const [environmentName, setEnvironmentName] = useState("")
const [environments, setEnvironments] = useState([])

  useEffect(() => {
  loadProjects()
  loadFlags()
  loadEnvironments()
}, [])

const loadProjects = async () => {
  const token =
  localStorage.getItem("token")

const data =
  await getProjects(token)

  setProjects(data)
}

const loadEnvironments = async () => {
  const data = await getEnvironments()

  setEnvironments(data)
}

const loadFlags = async () => {
  const token =
    localStorage.getItem("token")

  const data =
    await getFlags(token)

  setFlags(data)
}

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6"
      }}
    >
      <Sidebar
        page={page}
        setPage={setPage}
      />

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >
        <h1>Projects</h1>

        {/* Create Project Card */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "20px"
          }}
        >
          <h2
  style={{
    marginBottom: "20px"
  }}
>
  🚀 Create Project
</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px"
            }}
          >
            <input
              placeholder="Project Name"
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                minWidth: "250px"
              }}

            />

            <button
  onClick={async () => {
    if (!projectName) return

    const token =
      localStorage.getItem("token")

    await createProject(
      token,
      {
        name: projectName
      }
    )

    setProjectName("")

    await loadProjects()
  }}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Create Project
            </button>
          </div>
          <h2
  style={{
    marginTop: "40px",
    marginBottom: "20px"
  }}
>
  🌍 Create Environment
</h2>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  }}
>
  <input
    placeholder="Environment Name"
    value={environmentName}
    onChange={(e) =>
      setEnvironmentName(
        e.target.value
      )
    }
    style={{
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      minWidth: "250px"
    }}
  />

  <button
    onClick={async () => {
  

  if (
    !selectedProject ||
    !environmentName
  )
    return

  await createEnvironment({
    name: environmentName,
    projectId:
      selectedProject.id
  })

  setEnvironmentName("")

  loadEnvironments()
}}
  >
    Create Environment
  </button>
</div>
        </div>

        {/* Projects List */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "30px"
          }}
        >
          <h2>Projects</h2>

          {projects.map((project) => (
  <div
    key={project.id}
    onClick={() => {
  setSelectedProject(project)
  setSelectedProjectId(project.id)
}}
              style={{
                marginTop: "15px",
                padding: "15px",
                border:
                  selectedProject?.id === project.id
                  ? "2px solid #2563eb"
                  : "1px solid #eee",
                background:
                  selectedProject?.id === project.id
                  ? "#eff6ff"
                  : "white",
                borderRadius: "10px",
                cursor: "pointer"
              }}
              
            >
              <h3
  style={{
    marginBottom: "10px"
  }}
>
  {project.name}
</h3>

             <p>
  {
    flags.filter(
      (flag) =>
        flag.projectId === project.id
    ).length
  } Feature Flags
</p>

              <div
  style={{
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    flexWrap: "wrap"
  }}
>
  {environments
    .filter(
      (env) =>
        env.projectId === project.id
    )
    .map((env) => (
      <span
        key={env.id}
        style={{
          background: "#e0e7ff",
          color: "#3730a3",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "14px"
        }}
      >
        {env.name}
      </span>
    ))}
</div>
            </div>
          ))}
        </div>
        {selectedProject && (
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "30px"
    }}
  >
    <h2>
  Selected Project: {selectedProject.name}
</h2>
    <h3>Environments</h3>

{environments
  .filter(
    (env) =>
      env.projectId ===
      selectedProject.id
  )
  .map((env) => (
    <div
      key={env.id}
      style={{
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "10px",
        fontWeight: "500"
      }}
    >
      🌍 {env.name}
    </div>
  ))}
   
    <h3>Feature Flags</h3>

<div
  style={{
    marginTop: "20px"
  }}
>
  <div
  style={{
    marginTop: "20px"
  }}
>
  {flags
  .filter(
    (flag) =>
      flag.projectId ===
      selectedProject?.id
  )
  .map((flag) => (
    <div
      key={flag.id}
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        padding: "14px",
        border:
          "1px solid #e5e7eb",
        borderRadius: "10px",
        marginBottom: "12px",
        background: "white"
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "600"
          }}
        >
          {flag.name}
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "4px"
          }}
        >
          Rollout: {flag.rollout}%
        </div>
      </div>

      <span
        style={{
          background:
            flag.isActive
              ? "#dcfce7"
              : "#fee2e2",
          color:
            flag.isActive
              ? "#166534"
              : "#991b1b",
          padding:
            "4px 10px",
          borderRadius:
            "999px",
          fontSize: "12px",
          fontWeight: "500"
        }}
      >
        {flag.isActive
          ? "Active"
          : "Inactive"}
      </span>
    </div>
  ))}
</div>
</div>
  </div>
)}
      </div>
    </div>
  )
}
export default Projects