import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import CONFIG from "../config/index";
import { v4 as uuidv4 } from "uuid";
export const DataContext = React.createContext();

const DataProvider = (props) => {
  const [logeado, setLogeado] = useState(false);
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [dataTableDelivery, setDataTableDelivery] = useState(null);
  const [dataFormDelivery, setDataFormDelivery] = useState(null);
  const [activeTap, setActiveTap] = useState("1");

  useEffect(() => {
    try {
      llenarTokenLocal();
    } catch (error) {
      console.error(error);
    }
  }, [logeado]);

  ///////////////////////////
  const llenarTokenLocal = async () => {
    const tokenLocal = localStorage.getItem("token");
    if (tokenLocal) {
      setLogeado(true);
    }
  };

  /////////////////////////////////////
  const login = async (datos, props) => {
    setVisibleLoading(true);
    if (datos !== undefined && datos !== null) {
      try {
        let url = CONFIG.URL + "auth/signin";
        const json = await axios.post(url, datos);
        const data = json.data;
        console.log(data.user.username);
        if (json.status === 200) {
          props.history.push("/home");
          setLogeado(true);
          localStorage.setItem("usuarioSesion", JSON.stringify(true));
          localStorage.setItem("token", data.token);
          const userName = data.user.username;
          localStorage.setItem("usuarioNombre", JSON.stringify(userName));

          setTimeout(function () {
            setVisibleLoading(false);
          }, 2000);
        } else if (json.status === 201) {
          setTimeout(function () {
            setVisibleLoading(false);
          }, 2000);
        } else if (json.status === 401) {
          localStorage.clear();
          setLogeado(false);
        }
      } catch (e) {
        setTimeout(function () {
          setVisibleLoading(false);
        }, 2000);
        console.log(e);
        // if (e.response.status === 401 || e.response.status === 500) {
        //    destruirSesion()
        //  }
      }
    }
  };

  ////////////////////////////////////
  const destruirSesion = async () => {
    await localStorage.clear();
    setLogeado(false);
  };

  const crearDomiciliario = async (datos) => {
    if (datos !== undefined && datos !== null) {
      setVisibleLoading(true);
      let token = localStorage.getItem("token", JSON.stringify(true));
      try {
        let url = CONFIG.URL + "delivery";
        const json = await axios({
          method: "post", //you can set what request you want to be
          url: url,
          data: datos,
          headers: {
            Authorization: token,
          },
        });
        const data = json;
        if (json.status === 200) {
          setTimeout(function () {
            setVisibleLoading(false);
          }, 2000);
          message.success("Domiciliario Creado");
          setActiveTap("1");
          cargarListaDomiciliarios();
        }else{
          if (data.status === 202){
          setTimeout(function () {
            setVisibleLoading(false);
          }, 2000);
          message.error(data.data.message);
          return
        }}
      } catch (error) {
        console.error(error);
      }
    }
  };

  const actualizarDomiciliario = async (datos) => {
    if (datos !== undefined && datos !== null) {
      if (
        datos.password === null ||
        datos.password === "" ||
        datos.password === undefined
      ) {
        delete datos.password;
      }
      setVisibleLoading(true);
      let token = localStorage.getItem("token", JSON.stringify(true));
      let url = CONFIG.URL + `delivery/${datos._id}`;
      try {
        const json = await axios({
          method: "put", //you can set what request you want to be
          url: url,
          data: datos,
          headers: {
            Authorization: token,
          },
        });
        const data = json;
        if (data.status === 200) {
          setTimeout(function () {
            setVisibleLoading(false);
          }, 2000);
          message.success("Domiciliario Actualizado");
          setActiveTap("1");
          cargarListaDomiciliarios();
        } else {
            setTimeout(function () {
              setVisibleLoading(false);
            }, 2000);
            message.error(data.data.message);
            return
          //message.error(data.status.json.message);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const cargarListaDomiciliarios = async () => {
    setVisibleLoading(true);
    let token = localStorage.getItem("token", JSON.stringify(true));
    try {
      let url = CONFIG.URL + "delivery";
      const json = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = json;
      if (data.status === 200) {
        for (var i = 0; i < data.data.length; i++) {
          data.data[i].key = uuidv4();
        }
        setDataTableDelivery(data.data);
        setTimeout(function () {
          setVisibleLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /////////////////////
  /////
  return (
    <DataContext.Provider
      value={{
        login,
        destruirSesion,
        logeado,
        URL: CONFIG.URL,
        visibleLoading,
        crearDomiciliario,
        cargarListaDomiciliarios,
        actualizarDomiciliario,
        dataTableDelivery,
        dataFormDelivery,
        setDataFormDelivery,
        activeTap,
        setActiveTap,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
