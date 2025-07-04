import { Layout, Menu } from "antd";
import React, { useState } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { logoTransparent } from "../../../assets/images";
import ManagementIcon from "../../../assets/icon/management";
import ReportIcon from "../../../assets/icon/reporting";

const { Sider } = Layout;

const Asider = () => {
  const [collapsed, setCollapsed] = useState(false);
  function getItem({ label, key, icon, children, onClick }) {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    };
  }

  const { pathname } = useLocation();
  const title = pathname
    .replace(
      pathname.includes("manajemen")
        ? "/desktop/manajemen"
        : "/desktop/laporan",
      ""
    )
    .split("-")
    .toString()
    .replaceAll(",", "");

  const navigate = useNavigate();

  const items = [
    //   getItem("Management", "1", <PieChartOutlined />),
    getItem({
      key: "management",
      label: "Manajemen",
      icon: <ManagementIcon fill="white" className="w-5 h-5" />,
      children: [
        getItem({
          key: "acara",
          label: "Acara",
          onClick: () => {
            navigate("/desktop/manajemen-acara");
          },
        }),
        getItem({
          key: "penyelenggara",
          label: "Penyelenggara",
          onClick: () => {
            navigate("/desktop/manajemen-penyelenggara");
          },
        }),
        getItem({
          key: "users",
          label: "User",
          onClick: () => {
            navigate("/desktop/manajemen-user");
          },
        }),
      ],
    }),
    getItem({
      key: "reporting",
      label: "Laporan",
      icon: <ReportIcon fill="white" className="w-5 h-5" />,
      children: [
        getItem({
          key: "transaksi",
          label: "Transaksi",
          onClick: () => {
            navigate("/desktop/laporan-transaksi");
          },
        }),
      ],
    }),
  ];
  return (
    <Sider
      className=" bottom pt-[3.5vh]"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="flex justify-center mb-[4vh] items-center space-x-1">
        <img src={logoTransparent} alt="vend logo" className="h-16" />
        {!collapsed && (
          <p className="font-bold text-2xl text-white ">GoEventID</p>
        )}
      </div>
      <Menu
        theme="dark"
        // defaultSelectedKeys={["3"]}
        selectedKeys={[title]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Asider;
