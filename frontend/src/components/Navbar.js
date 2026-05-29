function Navbar({ onLogout }) {
  return (
    <div
      style={{
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>Dashboard</h2>

      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar