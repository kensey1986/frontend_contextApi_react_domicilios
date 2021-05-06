import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, Select } from "antd";

const Create = (props) => {
  const { crearDomiciliario } = useContext(DataContext);
  const [selectData, setSelectData] = useState(null);
  let {  listSucursales } = props;
  const { Option } = Select;


  function handleChange(value) {
    if (value) {
      setSelectData(value);
    }
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  const onFinish = async (values) => {
    values = {
      name: values.name.toUpperCase(),
      username: values.username.toUpperCase(),
      password: values.password,
      sucursal: selectData,
    };
     crearDomiciliario(values);
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
            <Card title='Crear Domiciliario' bordered={false} style={{ width: 400 }}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Nick"
                  name="username"
                  rules={[
                    { required: true, message: "Por favor ingresar Nick!" },
                  ]}
                >
                  <Input 
                    autoComplete="none" 
                    placeholder="Digite un 'Nick' " 
                    />
                </Form.Item>
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[
                    { required: true, message: "Por favor ingresar nombre!" },
                  ]}
                >
                  <Input
                    autoComplete="none"
                    placeholder="Digite su 'Nombre' "
                  />
                </Form.Item>
                <Form.Item
                    label="Conraseña"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingresar Conraseña!",
                      },
                    ]}
                  >
                    <Input.Password
                      autoComplete="new-password"
                      placeholder="Digite su 'Contraseña' "
                    />
                  </Form.Item>
                 <Form.Item label="Select">
                  <Select
                    defaultValue="Seleccione..."
                    onChange={handleChange}
                    allowClear={false}
                    name='sucursal'
                  >
                    {listSucursales.map((datos) => {
                      return <Option key={datos._id}>{datos.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Crear
                    </Button>
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

export default Create;
