import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, Select } from "antd";
import TableDomicilio from "./TableDomicilio";
import SelectProducto from "./SelectProducto";

const Create = (props) => {
  const { crearDomicilio, dataDeliveryBySucursal } = useContext(DataContext);

  const [selectData, setSelectData] = useState(null);
  const [selectData2, setSelectData2] = useState(null);
  const [selectData1, setSelectData1] = useState(null);
  const { listSucursales, domiciliarioBySucursal, listaClientes } = props;
  const { TextArea } = Input;
  const { Option } = Select;

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 2, span: 22 },
  };

  function handleChange(value) {
    if (value) {
      setSelectData(value);
      domiciliarioBySucursal(value);
    }
  }

  function handleChange2(value) {
    if (value) {
      setSelectData2(value);
    }
  }
  function handleChange1(value) {
    if (value) {
      setSelectData1(value);
    }
  }

  const onFinish = async (values) => {
    values = {
      observacion: values.observacion,
      sucursal: selectData,
      delivery: selectData2,
      cliente: selectData1,
    };
    crearDomicilio(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <div style={{ padding: 10, background: "#ececec" }}>
            <Card title="Crear Domicilio" bordered={false}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Cliente" name="articulo">
                  <Select
                    defaultValue="Seleccione..."
                    onChange={handleChange1}
                    allowClear={false}
                  >
                    {listaClientes?.map((datos) => {
                      return <Option key={datos._id}>{datos.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
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
                  <Select onChange={handleChange2} allowClear={false}>
                    {dataDeliveryBySucursal?.map((datos) => {
                      return <Option key={datos._id}>{datos.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Observacion" name="observacion">
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <SelectProducto />
                  <TableDomicilio />
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
      </Row>
    </>
  );
};

export default Create;
