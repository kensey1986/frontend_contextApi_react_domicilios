import React, { useContext } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button } from "antd";

const Edit = (props) => {
  const { actualizarBarrio } = useContext(DataContext);
  let { dataForm } = props;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  const onFinish = async (values) => {
    if (values) {
      dataForm.name= values.name
      actualizarBarrio(dataForm);
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
            <Card title='Actualizar Barrio' bordered={false} style={{ width: 400 }}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={[
                  { name: "name", value: dataForm.name },
                ]}
              >
                <Form.Item
                  label="Barrio"
                  name="name"
                  rules={[
                    { required: true, message: "Por favor ingresar Barrio!" },
                  ]}
                >
                  <Input 
                    autoComplete="none" 
                    placeholder="Digite 'Barrio' " 
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Actualizar
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

export default Edit;
