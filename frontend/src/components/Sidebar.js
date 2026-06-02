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
      <h1>Feature Flag Platform</h1>

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
        <p>Features </p>
        <p>Analytics (Coming Soon)</p>
        <p>Audit Logs (Coming Soon)</p>
        <p>Settings (Coming Soon)</p>
      </div>
    </div>
  )
}

export default Sidebar