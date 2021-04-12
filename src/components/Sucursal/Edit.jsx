import React, { useContext } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button } from "antd";

const CreateEdit = (props) => {
  const { actualizarSucursal } = useContext(DataContext);
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
      dataForm.direccion= values.direccion
      actualizarSucursal(dataForm);
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
            <Card title='Actualizar Sucursal' bordered={false} style={{ width: 400 }}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={[
                  { name: "name", value: dataForm.name },
                  { name: "direccion", value: dataForm.direccion },
                ]}
              >
                <Form.Item
                  label="Sucursal"
                  name="name"
                  rules={[
                    { required: true, message: "Por favor ingresar Sucursal!" },
                  ]}
                >
                  <Input 
                    autoComplete="none" 
                    placeholder="Digite un 'Sucursal' " 
                    />
                </Form.Item>
                <Form.Item
                  label="Direccion"
                  name="direccion"
                  rules={[
                    { required: true, message: "Por favor ingresar Direccion!" },
                  ]}
                >
                  <Input
                    autoComplete="none"
                    placeholder="Digite 'Direccion' "
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

export default CreateEdit;
