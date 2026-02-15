export default function AuthLayout({children,}: {children: React.ReactNode;}) {
  return (
    // Un contenedor simple, sin Sidebar
    <main className="h-screen w-full flex">
      {children}
    </main>
  );
}