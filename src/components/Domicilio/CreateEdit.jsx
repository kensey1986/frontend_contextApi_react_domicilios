import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, Select } from "antd";

const CreateEdit = (props) => {
  const { crearDomicilio, dataDeliveryBySucursal } = useContext(DataContext);
  const [selectData, setSelectData] = useState(null);
  const [selectData2, setSelectData2] = useState(null);
  let { dataForm, activeTap, actualizarData, listSucursales, domiciliarioBySucursal } = props;
  const { TextArea } = Input;
  let titulo = "Actualizar";
  const { Option } = Select;
  
  if (dataForm === null || dataForm === undefined) {
    dataForm = {
      observacion: "",
      sucursal: "",
      delivery:""
    };
  }
  if (activeTap === "2") {
    titulo = "Crear";
  } else {
    titulo = "Actualizar";
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  function handleChange(value) {
    if (value) {
      setSelectData(value);
      domiciliarioBySucursal(value)
    }
  }

  function handleChange2(value) {
    if (value) {
      setSelectData2(value)
    }
  }

  const onFinish = async (values) => {
    if (activeTap === "2") {
      values = {
        observacion: values.observacion,
        sucursal: selectData,
        delivery: selectData2
      };

      crearDomicilio(values);
    } else {
      dataForm.observacion = values.observacion;
      actualizarData(dataForm);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={7}></Col>
        <Col span={10}>
          <div style={{ padding: 30, background: "#ececec" }}>
            <Card title={titulo} bordered={false} style={{ width: 400 }}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={[{ name: "name", value: dataForm.name }]}
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
                  <Select
                    onChange={handleChange2}
                    allowClear={false}
                  >
                    {dataDeliveryBySucursal?.map((datos) => {
                      return <Option key={datos._id}>{datos.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Observacion"
                  name="observacion"
                >
                  {/* <Input
                    autoComplete="none"
                    placeholder="Digite un 'Nombre' "
                  /> */}
                  <TextArea rows={4}/>
                </Form.Item>
               
                <Form.Item {...tailLayout}>
                  {activeTap === "2" ? (
                    <Button type="primary" htmlType="submit">
                      Crear
                    </Button>
                  ) : (
                    <Button type="primary" htmlType="submit">
                      Actualizar
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Col>
        <Col span={7}></Col>
      </Row>
    </>
  );
};

export default CreateEdit;
