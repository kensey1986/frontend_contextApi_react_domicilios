import React, { useContext } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button } from "antd";

const Create = (props) => {
  const { crearCliente } = useContext(DataContext);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  const onFinish = async (values) => {
    console.log(values)
    crearCliente(values);
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
            <Card
              title="Crear Sucursal"
              bordered={false}
              style={{ width: 400 }}
            >
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
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
                  label="Apellido"
                  name="apellido"
                  rules={[
                    { required: true, message: "Por favor ingresar apellido!" },
                  ]}
                >
                  <Input autoComplete="none" placeholder="Digite 'Apellido' " />
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
