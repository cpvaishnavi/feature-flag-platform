import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"

import {
  getProjects,
  createProject,
  getFlags
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

  useEffect(() => {
  loadProjects()
  loadFlags()
}, [])

const loadProjects = async () => {
  const data = await getProjects()

  setProjects(data)
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
          <h2>Create Project</h2>

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

  await createProject({
    name: projectName
  })

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
              <h3>{project.name}</h3>

              <p>
                {project.features} Feature Flags
              </p>

              <p>
                Development • Staging • Production
              </p>
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
    <p>
      Project ID: {selectedProject.id}
    </p>
    <p>
      Global Selected Project ID:
      {" "}
      {selectedProjectId}
    </p>
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
        padding: "12px",
        border: "1px solid #eee",
        borderRadius: "8px",
        marginBottom: "10px"
      }}
    >
      {flag.name}
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