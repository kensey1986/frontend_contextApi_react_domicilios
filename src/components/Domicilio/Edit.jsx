import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, Select } from "antd";

const Edit = (props) => {
  const { dataDeliveryBySucursal, actualizarDomicilio } = useContext(DataContext);
  const [selectData2, setSelectData2] = useState(null);
  let { dataForm } = props;
  const { TextArea } = Input;
  const { Option } = Select;
  
  console.log(dataForm)

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  function handleChange2(value) {
    if (value) {
      setSelectData2(value)
    }
  }

  const onFinish = async (values) => {
    if (!selectData2) {
      values = {
        _id: dataForm._id,
        observacion: values.observacion,
        sucursal: dataForm.sucursal,
        cliente: dataForm.cliente,
        delivery: dataForm.delivery
      };
    }else {
      values = {
        _id: dataForm._id,
        observacion: values.observacion,
        sucursal: dataForm.sucursal,
        cliente: dataForm.cliente,
        delivery: selectData2
      };
    }
      
      console.log(values)
      actualizarDomicilio(values);
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
            <Card title='Modificar Domicilio' bordered={false} style={{ width: 400 }}>
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
                <Form.Item
                  label="Observacion"
                  name="observacion"
                >
                  <TextArea rows={4}/>
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
