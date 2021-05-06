import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, Select } from "antd";
import TableDomicilio from "./TableDomicilio";
import SelectProducto from "./SelectProducto";
import SelectCliente from "./SelectCliente";

const Create = (props) => {
  const {
    crearDomicilio,
    dataDeliveryBySucursal,
    dataTablePedido,
  } = useContext(DataContext);

  const [selectData, setSelectData] = useState(null);
  const [selectData2, setSelectData2] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [clienteAdd, setClienteAdd] = useState(false);

  const { listSucursales, domiciliarioBySucursal, filtrarCliente } = props;
  const { TextArea } = Input;
  const { Option } = Select;

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 2, span: 22 },
  };

  function handleChange(value) {
    if (value) {
      setSelectData(value);
      domiciliarioBySucursal(value);
    }
  }

  function handleChange2(value) {
    if (value) {
      setSelectData2(value);
    }
  }

  const onFinish = async (values) => {
    values = {
      observacion: values.observacion,
      sucursal: selectData,
      delivery: selectData2,
      cliente: cliente,
      items: dataTablePedido,
      direccion: direccion,
      estado: "Recibido",
    };
    crearDomicilio(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <SelectCliente
            setClienteAdd={setClienteAdd}
            filtrarCliente={filtrarCliente}
            setCliente={setCliente}
            setDireccion={setDireccion}
          />
        </Col>
        {clienteAdd ? (
          <Col span={24}>
            <div style={{ padding: 10, background: "#ececec" }}>
              <Card title="Crear Domicilio" bordered={false}>
                <Col span={24}>
                  <Form
                    {...layout}
                    initialValues={{ remember: false }}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item label="Sucursal">
                      <Select
                        defaultValue="Seleccione..."
                        onChange={handleChange}
                        allowClear={false}
                      >
                        {listSucursales?.map((datos) => {
                          return <Option key={datos._id}>{datos.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Domiciliario">
                      <Select onChange={handleChange2} allowClear={false}>
                        {dataDeliveryBySucursal?.map((datos) => {
                          return <Option key={datos._id}>{datos.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Observacion" name="observacion">
                      <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Crear
                      </Button>
                    </Form.Item>
                  </Form>
                  <SelectProducto />
                  <TableDomicilio />
                </Col>
              </Card>
            </div>
          </Col>
        ) : null}
      </Row>
    </>
  );
};

export default Create;
