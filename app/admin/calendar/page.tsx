import Calendar from "../../admin/components/Calender";
import { Metadata } from "next";
import AdminLayout from "../../admin/layout";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const CalendarPage = () => {
  return (
    <AdminLayout>
      <Calendar />
    </AdminLayout>
  );
};

export default CalendarPage;
