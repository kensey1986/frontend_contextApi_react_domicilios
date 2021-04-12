import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, Select } from "antd";

const CreateEdit = (props) => {
  const { actualizarDomiciliario } = useContext(DataContext);
  const [selectData, setSelectData] = useState(null);
  let { dataForm,  listSucursales } = props;
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
    dataForm.username = values.username;
    dataForm.name = values.name;
    dataForm.password = values.password;
    if (
      dataForm.password === null ||
      dataForm.password === "" ||
      dataForm.password === undefined
    ) {
      delete dataForm.password;
    }
    if (selectData) {
      dataForm.sucursal = selectData;
    }
    actualizarDomiciliario(dataForm);
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
                  { name: "username", value: dataForm.username },
                  { name: "name", value: dataForm.name },
                  { name: "password", value: null },
                ]}
              >
                 <Form.Item label="Select">
                  <Select
                    defaultValue={dataForm.sucursal.name}
                    name="combo"
                    onChange={handleChange}
                    allowClear={false}
                  >
                    {listSucursales?.map((datos) => {
                      return <Option key={datos._id}>{datos.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
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
                    disabled={true}
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
                      required: false,
                    },
                  ]}
                >
                  <Input.Password
                    autoComplete="new-password"
                    placeholder="Digite 'Nueva Contraseña' "
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
