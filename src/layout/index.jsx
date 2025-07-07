import { Layout } from "antd";
import React, { createContext, useEffect, useState } from "react";
import Asider from "../components/atoms/other/sider";
import HeaderLayout from "../components/atoms/header-layout";
import { Outlet } from "react-router-dom";

export const ContextApp = createContext();

const DesktopApp = () => {
  const [storageData, setStorageData] = useState(() => getStorageData());

  function getStorageData() {
    try {
      return {
        token: JSON.parse(localStorage?.token || "[]"),
      };
    } catch (err) {
      console.error("Failed to parse cookies:", err);
      return {};
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newStorage = getStorageData();
      const sorageChanged =
        JSON.stringify(newStorage) !== JSON.stringify(storageData);
      if (sorageChanged) {
        setStorageData(JSON.parse(JSON.stringify(newStorage))); // Trigger re-render
      }
    }, 300); // Check every second

    return () => clearInterval(interval);
  }, [storageData]);

  return (
    <ContextApp.Provider value={{ storageData }}>
      <Layout className="h-screen w-screen overflow-hidden bg-[#063127]">
        <Asider />
        <Layout>
          <HeaderLayout />
          <Layout.Content className="lg:px-3 2xl:px-8 lg:pb-4 2xl:pb-8 pt-4 bg-[#063127]">
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </ContextApp.Provider>
  );
};

export default DesktopApp;
