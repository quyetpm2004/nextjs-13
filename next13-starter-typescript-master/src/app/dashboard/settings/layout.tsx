export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Settings Section</h2>
      {children}
    </div>
  );
}
