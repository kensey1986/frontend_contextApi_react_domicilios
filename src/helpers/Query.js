import CONFIG from "../config/index";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";


export const autenticar = async (datos, uri, props) => {
  if (datos !== undefined && datos !== null) {
    try {
      let url = CONFIG.URL + uri;
      const json = await axios.post(url, datos);
      const data = json.data;
      if (json.status === 200) {
        props.history.push("/home");
        localStorage.setItem("usuarioSesion", JSON.stringify(true));
        localStorage.setItem("token", data.token);
        const userName = data.user.username;
        localStorage.setItem("usuarioNombre", JSON.stringify(userName));
        return true;
      } else if (json.status === 401) {
        props.history.push("/");
        localStorage.clear();
        return false;
      }
    } catch (e) {
      console.error(e)
    }
  }
};

export const listado = async (uri) => {
  let token = localStorage.getItem("token", JSON.stringify(true));
  //FIXME: CUANDO SE INICIA EL TOKEN LLEGA VACIO
  let data;
  try {
    let url = CONFIG.URL + uri;
    const json = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    data = json;
    if (data.status === 200) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].key = uuidv4();
      }
      data = data.data;
    }
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const crear = async (datos, uri) => {
  if (datos !== undefined && datos !== null) {
    let token = localStorage.getItem("token", JSON.stringify(true));
    try {
      let url = CONFIG.URL + uri;
      const json = await axios({
        method: "post", //you can set what request you want to be
        url: url,
        data: datos,
        headers: {
          Authorization: token,
        },
      });
      if (json.status === 200) {
        message.success('creado correctamente');
        return true;
      } else {
        message.error('error al crear');
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const actualizar = async (datos, uri) => {
  if (datos !== undefined && datos !== null) {
    let token = localStorage.getItem("token", JSON.stringify(true));
    let url = CONFIG.URL + uri+`/${datos._id}`;
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
        message.success('Actualizado correctamente');
        return true;
      } else {
        message.error('error al actualizarr');
        return false;
      }
    } catch (error) {
      console.log(error.response);
    }
  }
};
