import React, { useContext } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button } from "antd";

const CreateEdit = (props) => {
  const { crearDomiciliario } = useContext(DataContext);
  let { dataForm, activeTap, actualizarDomiciliario } = props;
  let titulo = "Actualizar";

  if (dataForm === null || dataForm === undefined) {
    dataForm = {
      username: "",
      name: "",
      password: "",
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

  const onFinish = async (values) => {
    if (activeTap === "2") {
       crearDomiciliario(values);
      
    } else {
      dataForm.username= values.username
      dataForm.name= values.name
      dataForm.password= values.password
       actualizarDomiciliario(dataForm);
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
                fields={[
                  { name: "username", value: dataForm.username },
                  { name: "name", value: dataForm.name },
                  { name: "password", value: null },
                ]}
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
                    disabled={activeTap === "3" || false}/>
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
                {activeTap === "2" ? (
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
                ) : (
                  <Form.Item
                    label="Conraseña"
                    name="password"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input.Password
                      autoComplete="new-password"
                      placeholder="Digite 'Nueva Contraseña' "
                    />
                  </Form.Item>
                )}

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
