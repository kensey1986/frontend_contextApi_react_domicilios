import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, Select, Radio } from "antd";
import SelectProducto from "./SelectProducto";
import TableDomicilio from "./TableDomicilio";
import { CloseOutlined } from "@ant-design/icons";

const Edit = (props) => {
  const {
    dataDeliveryBySucursal,
    actualizarDomicilio,
    setDataTablePedido,
    clienteSeleccionado,
    clienteById,
  } = useContext(DataContext);
  const [selectData2, setSelectData2] = useState(null);
  const [dirEnvio, setDirEnvio] = useState('');
  const [mostrarDir, setMostrarDir] = useState(true);


  let { dataForm } = props;
  const { TextArea } = Input;
  const { Option } = Select;

  useEffect(() => {
    setDataTablePedido(dataForm.items);
    setDirEnvio(dataForm.direccion);
    clienteById(dataForm.cliente._id);
  }, []);

  if (dataForm) {
    if (dataForm.observacion === undefined) {
      dataForm.observacion = "";
    }
  }
  //FIXME: REPARA EL PROBLEMA QUE REVIENTA EML PROGRAMA AL ESTAR EN EDITAR Y MOVERSE

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 2, span: 22 },
  };

  function handleChange2(value) {
    if (value) {
      setSelectData2(value);
    }
  }

  const eliminar = () => {
    setDirEnvio(null);
    setMostrarDir(false)
    setDirEnvio(dataForm.direccion);
  };

  const onChange2 = (e) => {
    setDirEnvio(e.target.value);
  };

  const onFinish = async (values) => {
    if (!selectData2) {
      values = {
        _id: dataForm._id,
        observacion: values.observacion,
        sucursal: dataForm.sucursal,
        cliente: dataForm.cliente,
        delivery: dataForm.delivery,
        direccion: dirEnvio
      };
    } else {
      values = {
        _id: dataForm._id,
        observacion: values.observacion,
        sucursal: dataForm.sucursal,
        cliente: dataForm.cliente,
        delivery: selectData2,
        direccion: dirEnvio
      };
    }
    setMostrarDir(true)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <div style={{ padding: 10, background: "#ececec" }}>
            <Card title="Modificar Domicilio" bordered={false}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={[{ name: "observacion", value: dataForm.observacion }]}
              >
                <Form.Item label="Cliente">
                  <Input
                    autoComplete="none"
                    defaultValue={dataForm.cliente.name}
                    disabled={true}
                  />
                </Form.Item>
                {mostrarDir ? (
                  <Form.Item label="Direccion">
                    <p>{`B. ${dataForm.direccion}`}</p>
                    <Button
                      danger
                      type="text"
                      icon={<CloseOutlined />}
                      onClick={eliminar}
                    />
                  </Form.Item>
                ) : (
                  
                  <Form.Item label="Direcciones">
                    <Radio.Group
                      onChange={onChange2}
                      value={dirEnvio}
                      name="radiogroup"
                    >
                      <Radio
                        value={`B. ${clienteSeleccionado.barrio.name} - ${clienteSeleccionado.direccion}`}
                      >{`B. ${clienteSeleccionado.barrio.name} - ${clienteSeleccionado.direccion}`}</Radio>
                      {clienteSeleccionado.barrios.map((data, { i = 1 }) => (
                        <p key={i++}>
                          <Radio
                            value={`B. ${data.barrio} - Dir. ${data.direccion}`}
                          >
                            B. {data.barrio} - Dir.{data.direccion}
                          </Radio>
                        </p>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                )}

                <Radio.Group
                  onChange={onChange2}
                  value={dirEnvio}
                  name="radiogroup"
                >
                 
                </Radio.Group>
                <Form.Item label="Sucursal">
                  <Input
                    autoComplete="none"
                    defaultValue={dataForm.sucursal.name}
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item label="Domiciliario">
                  <Select
                    defaultValue={dataForm.delivery.username}
                    onChange={handleChange2}
                    allowClear={false}
                  >
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
                    Actualizar
                  </Button>
                </Form.Item>
              </Form>
              <SelectProducto />
              <TableDomicilio />
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Edit;
