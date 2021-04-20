import React, { useContext, useState } from "react";
import { Button, Tooltip, Select, Input } from "antd";
import { DataContext } from "../../context/Context";
import { SearchOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const SelectProducto = () => {
  const { filtrarProducto, dataListArticulo,loading } = useContext(DataContext);
  const [busqueda, setBusqueda] = useState("");
  const { Option } = Select;
  const { Search } = Input;

  //console.log(dataListArticulo)

  const onSearch = (dato) => {
    filtrarProducto(dato);
  };

  function onChange(value) {
    console.log(`seleeciono de la lista ${value}`);
  }
  function handleAnswerChange(event) {
    event.preventDefault();
    //console.log(`selected ${busqueda}`);
    console.log(event.key);
    //   if(event.key === 'Enter'){
    // 		alert('The sky is your starting point!')
    // }
    //   filtrarProducto(busqueda);
  }

  function onBlur() {
    console.log("perdio foco");
    console.log(busqueda);
    filtrarProducto(busqueda);
  }

  return (
    <div>
      {/* <Select
        showSearch={true}
        style={{ width: 400 }}
        placeholder="Select a person"
       // optionFilterProp="children"
        onChange={onChange}
        // onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
      >
        {dataListArticulo?.map((datos) => {
                      return <Option key={uuidv4()}>{datos.nombre}</Option>;
                    })}
      </Select>
      <Tooltip title="Buscar">
      <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={buscar}/>
    </Tooltip> */}
      <Select
        showSearch
        loading={loading}
        onSearch={onSearch}
        style={{ width: "100%" }}
        onChange={
          /*aca ejecuta que va a hacer cuando elija el articulo*/
          () => null
        }
      >
        {dataListArticulo.map((producto) => (
          <Option key={producto.codigo} value={producto.nombre}>
            {producto.nombre + " / " + producto.precio}
          </Option>
        ))}
      </Select>
      ,
      {/*  <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: "100%" }}
    />*/}
    </div>
  );
};

export default SelectProducto;
