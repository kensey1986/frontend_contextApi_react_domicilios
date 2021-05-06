import React, { useContext, useState } from "react";
import { Button, Select, Row, Col, Radio, Form, Card } from "antd";
import { DataContext } from "../../context/Context";

const SelectCliente = (props) => {
  const {
    filtrarCliente,
    dataListCliente,
    loading,
    clienteSeleccionado,
    setClienteSeleccionado,
  } = useContext(DataContext);

  const { setCliente, setDireccion, setClienteAdd } = props;

  const [value, setValue] = useState(1);
  const [select, setSelect] = useState(true);
  const [dirEnvio, setDirEnvio] = useState(null);

  const { Option } = Select;
  const onChange1 = (e) => {
    setSelect(false);
    setValue(e.target.value);
  };

  const onChange2 = (e) => {
    setDirEnvio(e.target.value);
  };

  const onSearch = (dato) => {
    setCliente(null)
    setClienteAdd(false)
    dato = dato.toUpperCase();
    filtrarCliente(value, dato);
  };

  function onChange(value, record) {
    const client = record.item;
    if (value) {
      setClienteSeleccionado(client);
    }
  }

  const onFinish = (values) => {
    setClienteAdd(true);
    setCliente(clienteSeleccionado);
    setDireccion(dirEnvio);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: false }}
    >
      <Row gutter={12}>
        <Col span={8} >
          <Form.Item name="opcion">
            <Radio.Group onChange={onChange1} value={value}>
              <Radio value={1}>Documento</Radio>
              <Radio value={2}>Celular</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name="cliente">
            <Select
              showSearch
              loading={loading}
              onSearch={onSearch}
              style={{ width: "100%" }}
              onChange={onChange}
              disabled={select}
            >
              {dataListCliente.map((cliente) => (
                <Option key={cliente._id} item={cliente} value={cliente.name}>
                  {cliente.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
       
        {clienteSeleccionado && (
          <>
          <Col span={14}>
            <Card
              title="Datos Cliente"
              style={{ width: 500, alignItems: "star" }}
            >
              <p>
                <strong>Nombre: </strong> {clienteSeleccionado?.name}
              </p>
              {clienteSeleccionado?.barrio && (
                <Radio.Group
                  onChange={onChange2}
                  value={dirEnvio}
                  name="radiogroup"
                >
                  <Radio
                    value={`B. ${clienteSeleccionado?.barrio.name} - ${clienteSeleccionado?.direccion}`}
                  >{`B. ${clienteSeleccionado?.barrio.name} - ${clienteSeleccionado?.direccion}`}</Radio>
                  {clienteSeleccionado?.barrios?.map((data, { i = 1 }) => (
                    <p key={i++}>
                      <Radio
                        value={`B. ${data.barrio} - Dir. ${data.direccion}`}
                      >
                        B. {data.barrio} - Dir.{data.direccion}
                      </Radio>
                    </p>
                  ))}
                </Radio.Group>
              )}
            </Card>
          </Col>
           <Col span={4} offset={8}>
           <Form.Item>
             <Button type="primary" htmlType="submit">
               Agregar
             </Button>
           </Form.Item>
         </Col>
         </>
        )}
        
      </Row>
    </Form>
  );
};

export default SelectCliente;
