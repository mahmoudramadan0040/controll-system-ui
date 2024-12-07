"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./css/satoshi.css";
import "./css/style.css";
// import "../../styles/globals.css";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";

const Loader = dynamic(() => import('./components/common/Loader'), { ssr: false });
import DefaultLayout from "./components/Layouts/DefaultLayout";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (


        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
  

  );
}
