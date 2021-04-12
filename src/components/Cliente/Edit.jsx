import React, { useContext, } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button } from "antd";

const CreateEdit = (props) => {
  const { actualizarCliente } = useContext(DataContext);
  let { dataForm } = props;

 
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  const onFinish = async (values) => {
    dataForm.apellido = values.apellido;
    dataForm.name = values.name;
    if (
      dataForm.password === null ||
      dataForm.password === "" ||
      dataForm.password === undefined
    ) {
      delete dataForm.password;
    }
    actualizarCliente(dataForm);
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
            <Card title="Actualizar Domiciliario" bordered={false} style={{ width: 400 }}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={[
                  { name: "apellido", value: dataForm.apellido },
                  { name: "name", value: dataForm.name },
                ]}
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
                    { required: true, message: "Por favor ingresar Apellido!" },
                  ]}
                >
                  <Input
                    autoComplete="none"
                    placeholder="Digite 'Apellido' "
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
