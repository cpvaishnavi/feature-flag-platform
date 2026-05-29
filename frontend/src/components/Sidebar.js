function Sidebar({ page, setPage }) {
  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Feature Control</h2>

      <div style={{ marginTop: "30px" }}>
        <p
  onClick={() => setPage("dashboard")}
  style={{
    cursor: "pointer"
  }}
>
  Dashboard
</p>
        <p
  onClick={() => setPage("projects")}
  style={{
    cursor: "pointer"
  }}
>
  Projects
</p>
        <p>Features</p>
        <p>Analytics</p>
        <p>Audit Logs</p>
        <p>Settings</p>
      </div>
    </div>
  )
}

export default Sidebar