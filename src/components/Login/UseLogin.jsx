import React, { useContext } from "react";
import { DataContext } from "../../context/Context";
import {
  Card,
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";

const UseLogin = (props) => {

  const {login} = useContext(DataContext);
  const { Header, Footer, Content } = Layout;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    login(values, props)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Card title="Bienvenido" style={{ width: 300, marginTop: 20, border: 1 }}>
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Usuario"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Ingresar Usuario!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Ingresar Contraseña!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    {...tailLayout}
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>Recordar</Checkbox>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Ingresar
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
 
};

export default UseLogin;
