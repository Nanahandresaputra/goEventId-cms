import { Layout } from "antd";
import React from "react";
import Asider from "../components/atoms/other/sider";
import HeaderLayout from "../components/atoms/header-layout";
import { Outlet } from "react-router-dom";

const DesktopApp = () => {
  return (
    <Layout className="h-screen w-screen overflow-hidden bg-[#063127]">
      <Asider />
      <Layout>
        <HeaderLayout />
        <Layout.Content className="lg:px-3 2xl:px-8 lg:pb-4 2xl:pb-8 pt-4 bg-[#063127]">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DesktopApp;
