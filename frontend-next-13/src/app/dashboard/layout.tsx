export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, background: "#eee" }}>
        Sidebar Dashboard
      </aside>
      <section style={{ flex: 1 }}>{children}</section>
    </div>
  );
}
