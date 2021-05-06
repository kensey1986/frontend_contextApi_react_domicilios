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
  const [dataTablePedido, setDataTablePedido] = useState([]);
  const [dataListCliente, setDataListCliente] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [dataTableEstado, setDataTableEstado] = useState(null);


  const [activeTap, setActiveTap] = useState("1");
  // const [loading, setLoading] = useState(false);

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
    loading();
    const uri = "auth/signin";
    const res = await autenticar(datos, uri, props);
    if (res) {
      setLogeado(true);
      setActiveTap("1");
    } else {
      setLogeado(false);
    }
    loading();
  };

  ////////////////////////////////////
  const destruirSesion = async () => {
    await localStorage.clear();
    setLogeado(false);
  };

  const loading = () => {
    setTimeout(function () {
      setVisibleLoading(!setVisibleLoading);
    }, 1000);
  };

  /// Inicio seccion Cliente ********************************************************
  const crearCliente = async (datos) => {
    loading();
    const uri = "cliente";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaCliente();
    }
    loading();
  };
  const actualizarCliente = async (datos) => {
    loading();
    const uri = "cliente";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaCliente();
    }
    loading();
  };

  const filtrarCliente = async (tipo, dato) => {
    if (dato) {
      let token = localStorage.getItem("token", JSON.stringify(true));
      let url = CONFIG.URL + `cliente/filtrardoc/${dato}`;
      if (tipo === 2) {
        url = CONFIG.URL + `cliente/filtrarcel/${dato}`;
      }
      loading();
      try {
        const json = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        let data = json;
        if (data.status === 200) {
          for (var i = 0; i < data.data.length; i++) {
            data.data[i].key = i;
          }
          data = data.data;
          setDataListCliente(data);
          loading();
        }
      } catch (error) {
        loading();
        console.error(error);
      }
    }
  };

  const clienteById = async (id) => {
    if (id) {
      let token = localStorage.getItem("token", JSON.stringify(true));
      let url = CONFIG.URL + `cliente/${id}`;
      loading();
      try {
        const json = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        let data = json;
        if (data.status === 200) {
          for (var i = 0; i < data.data.length; i++) {
            data.data[i].key = i;
          }
          data = data.data;
          setClienteSeleccionado(data);
          loading();
        }
      } catch (error) {
        loading();
        console.error(error);
      }
    }
  };

  const cargarListaCliente = async () => {
    loading();
    const uri = "cliente";
    const res = await listado(uri);
    setDataTableCliente(res);
    loading();
  };

  /// Fin seccion Cliente ****************************************************************
  /// Inicio seccion domiciliario ********************************************************
  const crearDomiciliario = async (datos) => {
    loading();
    const uri = "delivery";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomiciliarios();
    }
    loading();
  };

  const actualizarDomiciliario = async (datos) => {
    loading();
    const uri = "delivery";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomiciliarios();
    }
    loading();
  };

  const cargarListaDomiciliarios = async () => {
    loading();
    const uri = "delivery";
    const res = await listado(uri);
    setDataTableDelivery(res);
    loading();
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
      }
    } catch (error) {
      console.error(error);
    }
  };
  /// Fin seccion domiciliario ********************************************************
  /// Inicio seccion sucursales *******************************************************
  const crearSucursal = async (datos) => {
    loading();
    const uri = "sucursal";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaSucursales();
    }
    loading();
  };

  const actualizarSucursal = async (datos) => {
    loading();
    const uri = "sucursal";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaSucursales();
    }
    loading();
  };

  const cargarListaSucursales = async () => {
    loading();
    const uri = "sucursal";
    const res = await listado(uri);
    setDataTableSucursal(res);
    loading();
  };

  /// Fin seccion sucursales ***********************************************************
  /// Inicio seccion domicilios ********************************************************
  const crearDomicilio = async (datos) => {
    loading();
    const uri = "domicilio";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomicilio();
    }
    loading();
    setClienteSeleccionado(null)
  };

  const actualizarDomicilio = async (datos) => {
    loading();
    const uri = "domicilio";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaDomicilio();
    }
    loading();
  };

  const actualizarDomicilioByEstado = async (datos) => {
    //setVisibleLoading(true);
    loading();
     if (datos !== undefined && datos !== null) {
       let token = localStorage.getItem("token", JSON.stringify(true));
       let url = CONFIG.URL + `domicilio/estado/${datos._id}`;
      // let url = CONFIG.URL + uri+`/${datos._id}`;
       try {
         const json = await axios({
           method: "put", 
           url: url,
           data: datos,
           headers: {
             Authorization: token,
           },
         });
         if (json.status === 200) {
          console.log('Actualizado correctamente');
           return true;
         } else {
           console.log.error('error al actualizarr');
           return false;
         }
       } catch (error) {
         console.log(error.response);
       }
     }

  };

  const cargarListaDomicilio = async () => {
    loading();
    const uri = "domicilio";
    const res = await listado(uri);
    setDataTableDomicilio(res);
    loading();
  };
  /// Fin seccion sucursales ********************************************************
  ////Inicio seccion productos ******************************************************
  const filtrarProducto = async (articulo) => {
    //setVisibleLoading(true);
    loading();
    try {
      let url = CONFIG.URL + `products/${articulo}`;
      const json = await axios(url);
      let data = json;
      if (data.status === 200) {
        for (var i = 0; i < data.data.length; i++) {
          data.data[i].key = i;
        }
        data = data.data;
        setDataListArticulo(data);
        loading();
      }
    } catch (error) {
      loading();
      console.error(error);
    }
  };
  /// Fin seccion productos *********************************************************
  /// Inicio seccion sucursales *******************************************************
  const crearBarrio = async (datos) => {
    loading();
    const uri = "barrio";
    const res = await crear(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaBarrios();
    }
    loading();
  };

  const actualizarBarrio = async (datos) => {
    loading();
    const uri = "barrio";
    const res = await actualizar(datos, uri);
    if (res) {
      setActiveTap("1");
      cargarListaBarrios();
    }
    loading();
  };

  const cargarListaBarrios = async () => {
    loading();
    const uri = "barrio";
    const res = await listado(uri);
    setDataTableBarrio(res);
    loading();
  };

  const barrioById = async (barrioId) => {
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

  /// Fin seccion productos *********************************************************
  /// Inicio seccion sucursales *******************************************************
  const cargarListaEstados = async () => {
    loading();
    const uri = "estado";
    const res = await listado(uri);
    setDataTableEstado(res);
    loading();
  };
  /// Fin seccion productos *********************************************************
  /// Inicio seccion sucursales *******************************************************
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
        dataTablePedido,
        setDataTablePedido,
        filtrarCliente,
        dataListCliente,
        clienteSeleccionado,
        setClienteSeleccionado,
        clienteById,
        actualizarDomicilioByEstado,
        cargarListaEstados,
        dataTableEstado
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
