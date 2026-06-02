import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import MetricCard from "../components/MetricCard"

function Dashboard({
  onLogout,
  flags,
  projects,
  name,
  rollout,
  setName,
  setRollout,
  handleCreate,
  handleToggle,
  page,
  setPage,
  selectedProjectId
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <Sidebar
  page={page}
  setPage={setPage}
/>

      <div
        style={{
          flex: 1,
        }}
      >
        <Navbar onLogout={onLogout} />

        <div
          style={{
            padding: "30px",
          }}
        >
          <h1>Dashboard Overview</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <MetricCard
              title="Active Features"
              value={
                flags.filter(flag => flag.isActive).length
              }
            />

            <MetricCard
              title="Disabled Features"
              value={
                flags.filter(flag => !flag.isActive).length
              }
            />

            <MetricCard
  title="Total Flags"
  value={flags.length}
/>

            <MetricCard
  title="Average Rollout"
  value={
    flags.filter(
      (flag) => flag.isActive
    ).length
      ? Math.round(
          flags
            .filter(
              (flag) =>
                flag.isActive
            )
            .reduce(
              (sum, flag) =>
                sum + flag.rollout,
              0
            ) /
            flags.filter(
              (flag) =>
                flag.isActive
            ).length
        ) + "%"
      : "0%"
  }
/>
          </div>

          {/* Create Feature Card */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "30px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Create Feature</h2>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <input
                placeholder="Feature Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={{
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  minWidth: "220px"
}}
              />

              <input
                type="number"
                placeholder="Rollout %"
                value={rollout}
                onChange={(e) =>
                  setRollout(
                    Number(e.target.value)
                  )
                }
              />

              <button
  onClick={handleCreate}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  }}
>
  Create
</button>
            </div>
          </div>

          {/* Feature Flags Card */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "30px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Feature Flags</h2>

            {flags.map((flag) => (
              <div
                key={flag.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <strong>{flag.name}</strong>
                  <div
  style={{
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "4px"
  }}
>
  Project:
  {" "}
  {flag.project?.name || "None"}
</div>

                  <div style={{ marginTop: "8px" }}>
  <div
    style={{
      fontSize: "14px",
      marginBottom: "6px"
    }}
  >
    Rollout: {flag.rollout}%
  </div>

  <div
    style={{
      width: "220px",
      height: "8px",
      background: "#e5e7eb",
      borderRadius: "999px",
      overflow: "hidden"
    }}
  >
    <div
      style={{
        width: `${flag.rollout}%`,
        height: "100%",
        background: "#2563eb"
      }}
    />
  </div>
</div>

                  <div style={{ marginTop: "8px" }}>
  <span
    style={{
      background: flag.isActive
        ? "#dcfce7"
        : "#fee2e2",
      color: flag.isActive
        ? "#166534"
        : "#991b1b",
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600"
    }}
  >
    {flag.isActive
      ? "Active"
      : "Disabled"}
  </span>
</div>
                </div>

                <button
  onClick={() =>
    handleToggle(flag.name)
  }
  style={{
    background: flag.isActive
      ? "#ef4444"
      : "#22c55e",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    minWidth: "90px"
  }}
>
  {flag.isActive
    ? "Disable"
    : "Enable"}
</button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard