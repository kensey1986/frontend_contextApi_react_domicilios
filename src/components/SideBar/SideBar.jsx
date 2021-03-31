import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { Layout, Menu } from "antd";
import {
  ColumnWidthOutlined,
  PicLeftOutlined,
  UploadOutlined,
  DollarCircleOutlined,
  InfoCircleOutlined,
  SettingFilled,
} from "@ant-design/icons";

const SideBar = () => {
  const { Sider } = Layout;
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      {/* <div><img src ="img/logo.png" width={180}/></div> */}
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<PicLeftOutlined id="icono" />}>
          <Link to="/home">Bitacora</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ColumnWidthOutlined id="icono" />}>
          <Link to="/delivery">Domiciliario</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined id="icono" />}>
          <Link to="/manager">Gestor Artículos</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<DollarCircleOutlined id="icono" />}>
          <Link to="/discount">Descuentos</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<InfoCircleOutlined id="icono" />}>
          <Link to="/information">Gestión Ordenes</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<SettingFilled id="icono" />}>
          <Link to="/configuration">Informes</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
