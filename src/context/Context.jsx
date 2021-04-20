import React, { useState, useEffect } from "react";

import axios from "axios";
import CONFIG from "../config/index";
import { v4 as uuidv4 } from "uuid";
import { autenticar, listado, crear, actualizar } from "../helpers/Query";
export const DataContext = React.createContext();

const DataProvider = (props) => {
  const [logeado, setLogeado] = useState(false);
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [dataTableDelivery, setDataTableDelivery] = useState(null);
  const [dataFormDelivery, setDataFormDelivery] = useState(null);
  const [dataDeliveryBySucursal, setDataDeliveryBySucursal] = useState(null);
  const [dataTableSucursal, setDataTableSucursal] = useState(null);
  const [dataFormSucursal, setDataFormSucursal] = useState(null);
  const [dataTableDomicilio, setDataTableDomicilio] = useState(null);
  const [dataFormDomicilio, setDataFormDomicilio] = useState(null);
  const [dataListArticulo, setDataListArticulo] = useState([]);
  const [dataTableCliente, setDataTableCliente] = useState(null);
  const [dataFormCliente, setDataFormCliente] = useState(null);
  const [dataTableBarrio, setDataTableBarrio] = useState(null);
  const [dataFormBarrio, setDataFormBarrio] = useState(null);
  const [activeTap, setActiveTap] = useState("1");
  const [loading, setLoading] = useState(false);

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
    //loading();
    const uri = "auth/signin";
    const res = await autenticar(datos, uri, props);
    if (res) {
      setLogeado(true);
      setActiveTap("1");
    } else {
      setLogeado(false);
    }
    //loading();
  };

  ////////////////////////////////////
  const destruirSesion = async () => {
    await localStorage.clear();
    setLogeado(false);
  };

  /*const //loading = () => {
    setTimeout(function () {
      setVisibleLoading(!setVisibleLoading);
    }, 1000);
  };*/

  /// Inicio seccion Cliente ********************************************************
  const crearCliente = async (datos) => {
    ////loading();
    const uri = "cliente";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaCliente();
    }
    //loading();
  };
  const actualizarCliente = async (datos) => {
    //loading();
    const uri = "cliente";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaCliente();
    }
    //loading();
  };

  const cargarListaCliente = async () => {
    //loading();
    const uri = "cliente";
    const res = await listado(uri);
    console.log(res);
    setDataTableCliente(res);
    //loading();
  };

  /// Fin seccion Cliente ****************************************************************
  /// Inicio seccion domiciliario ********************************************************
  const crearDomiciliario = async (datos) => {
    //loading();
    const uri = "delivery";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomiciliarios();
    }
    //loading();
  };

  const actualizarDomiciliario = async (datos) => {
    //loading();
    const uri = "delivery";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomiciliarios();
    }
    //loading();
  };

  const cargarListaDomiciliarios = async () => {
    //loading();
    const uri = "delivery";
    const res = await listado(uri);
    setDataTableDelivery(res);
    //loading();
  };

  const domiciliarioBySucursal = async (sucursalId) => {
    //setVisibleLoading(true);
    let token = localStorage.getItem("token", JSON.stringify(true));
    try {
      let url = CONFIG.URL + `delivery/list/${sucursalId}`;
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
        setDataDeliveryBySucursal(data.data);
        // setTimeout(function () {
        //   setVisibleLoading(false);
        // }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /// Fin seccion domiciliario ********************************************************
  /// Inicio seccion sucursales *******************************************************
  const crearSucursal = async (datos) => {
    //loading();
    const uri = "sucursal";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaSucursales();
    }
    //loading();
  };

  const actualizarSucursal = async (datos) => {
    //loading();
    const uri = "sucursal";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaSucursales();
    }
    //loading();
  };

  const cargarListaSucursales = async () => {
    //loading();
    const uri = "sucursal";
    const res = await listado(uri);
    setDataTableSucursal(res);
    //loading();
  };

  /// Fin seccion sucursales ***********************************************************
  /// Inicio seccion domicilios ********************************************************
  const crearDomicilio = async (datos) => {
    //loading();
    const uri = "domicilio";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomicilio();
    }
    //loading();
  };

  const actualizarDomicilio = async (datos) => {
    console.log(datos);
    //loading();
    const uri = "domicilio";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomicilio();
    }
    //loading();
  };

  const cargarListaDomicilio = async () => {
    //loading();
    const uri = "domicilio";
    const res = await listado(uri);
    setDataTableDomicilio(res);
    //loading();
  };
  /// Fin seccion sucursales ********************************************************
  ////Inicio seccion productos ******************************************************
  const filtrarProducto = async (articulo) => {
    //setVisibleLoading(true);
    setLoading(true);
    try {
      let url = CONFIG.URL + `products/${articulo}`;
      const json = await axios(url);
      const data = json;
      if (data.status === 200) {
        setLoading(false);
        console.log(data.data);
        setDataListArticulo(data.data);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  /// Fin seccion productos *********************************************************
  /// Inicio seccion sucursales *******************************************************
  const crearBarrio = async (datos) => {
    //loading();
    const uri = "barrio";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaBarrios();
    }
    //loading();
  };

  const actualizarBarrio = async (datos) => {
    //loading();
    const uri = "barrio";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaBarrios();
    }
    //loading();
  };

  const cargarListaBarrios = async () => {
    //loading();
    const uri = "barrio";
    const res = await listado(uri);
    setDataTableBarrio(res);
    //loading();
  };

  const barrioById = async (barrioId) => {
    console.log(barrioId);
    setVisibleLoading(true);
    let token = localStorage.getItem("token", JSON.stringify(true));
    try {
      let url = CONFIG.URL + `/:barrioId/${barrioId}`;
      const json = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = json;
      if (data.status === 200) {
        setTimeout(function () {
          setVisibleLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /// Fin seccion sucursales ***********************************************************
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
        domiciliarioBySucursal,
        dataDeliveryBySucursal,
        setDataDeliveryBySucursal,
        activeTap,
        setActiveTap,
        cargarListaSucursales,
        crearSucursal,
        dataTableSucursal,
        dataFormSucursal,
        setDataFormSucursal,
        actualizarSucursal,
        crearDomicilio,
        actualizarDomicilio,
        cargarListaDomicilio,
        dataTableDomicilio,
        setDataTableDomicilio,
        dataFormDomicilio,
        setDataFormDomicilio,
        filtrarProducto,
        dataListArticulo,
        setDataListArticulo,
        crearCliente,
        actualizarCliente,
        cargarListaCliente,
        dataTableCliente,
        setDataTableCliente,
        dataFormCliente,
        setDataFormCliente,
        crearBarrio,
        actualizarBarrio,
        cargarListaBarrios,
        dataTableBarrio,
        setDataTableBarrio,
        dataFormBarrio,
        setDataFormBarrio,
        barrioById,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
