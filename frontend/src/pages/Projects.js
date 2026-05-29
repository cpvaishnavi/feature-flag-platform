import { useState } from "react"
import Sidebar from "../components/Sidebar"

function Projects({
  page,
  setPage
}) {
  const [projectName, setProjectName] = useState("")

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Netflix",
      features: 3
    },
    {
      id: 2,
      name: "Spotify",
      features: 5
    }
  ])

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
              onClick={() => {
                if (!projectName) return

                const newProject = {
                  id: Date.now(),
                  name: projectName,
                  features: 0
                }

                setProjects([
                  ...projects,
                  newProject
                ])

                setProjectName("")
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
              style={{
                marginTop: "15px",
                padding: "15px",
                border: "1px solid #eee",
                borderRadius: "10px"
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
      </div>
    </div>
  )
}

export default Projects