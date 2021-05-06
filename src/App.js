import React, { useContext, Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { DataContext } from "./context/Context";
import Default from "./components/Default/Default";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import UseLogin from "./components/Login/UseLogin";
import ProtecRoutes from "./Routes/ProtecRoutes";
import FreeRoute from "./Routes/FreeRoute";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Loading from "./components/Loading/Loading";
import Delivery from "./components/Delivery/Index";
import Sucursal from "./components/Sucursal/Index";
import Domicilio from "./components/Domicilio/Index";
import Cliente from "./components/Cliente/Index";
import Barrio from "./components/Barrio/Index";

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');



const App = () => {
  const { Content } = Layout;
  const { logeado, destruirSesion, visibleLoading } = useContext(DataContext);

  return (
    <BrowserRouter>
      <Layout>
        {logeado ? (
          <Fragment>
            <SideBar logeado={logeado} destruirSesion={destruirSesion} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header
                logeado={logeado}
                destruirSesion={destruirSesion}
                className="site-layout-background"
                style={{ padding: 0 }}
              />
              <Content
                className="site-layout-background"
                style={{ margin: "24px 16px 0", overflow: "initial" }}
              >
                <div
                  className="site-layout-background"
                  style={{ padding: 24, textAlign: "center" }}
                >
                  <Switch>
                    <FreeRoute exact path="/" component={UseLogin} />
                    <ProtecRoutes path="/home" component={Home} />
                    <ProtecRoutes path="/delivery" component={Delivery} />
                    <ProtecRoutes path="/sucursal" component={Sucursal} />
                    <ProtecRoutes path="/domicilio" component={Domicilio} />
                    <ProtecRoutes path="/barrio" component={Barrio} />
					<ProtecRoutes path="/cliente" component={Cliente} />
                    <Route component={Default} />
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Fragment>
        ) : (
          <Fragment>
            <FreeRoute exact path="/" component={UseLogin} />
            <Redirect to="/" />
          </Fragment>
        )}
      </Layout>
      <Loading visibleLoading={visibleLoading} />
    </BrowserRouter>
  );
};
export default App;
