import { DashBoardWrapper } from "../../components/dashBoardWrapper";

export default function DashboardLayout({children,}: {children: React.ReactNode;}) {
  return (
    // Aquí SÍ usamos el wrapper con Sidebar y Navbar
    <DashBoardWrapper>
      {children}
    </DashBoardWrapper>
  );
}