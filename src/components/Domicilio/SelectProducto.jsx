import React, { useContext, useState, useRef } from "react";
import {
  Button,
  Select,
  Row,
  Col,
  InputNumber,
  Form,
  Typography,
} from "antd";
import { DataContext } from "../../context/Context";

const SelectProducto = () => {
  const {
    filtrarProducto,
    dataListArticulo,
    loading,
    setDataTablePedido,
  } = useContext(DataContext);

  const [productoSeleccionado, setProductoSeleccionado] = useState({});
  const [total, setTotal] = useState(0);

  const { Option } = Select;
  const { Text } = Typography;

  let refCantidad = useRef(null);
  let refGramos = useRef(null);

  const onSearch = (dato) => {
    filtrarProducto(dato);
  };

  function onChange(value, record) {
    if (value) {
      setProductoSeleccionado(record.item);
      refCantidad.current.focus();
    }
  }


  const onFinish = (values) => {
    console.log('finalizara')
    const producto = {
      ...values,
      ...productoSeleccionado,
    };
    setDataTablePedido((dataTablePedido) => [...dataTablePedido, producto]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: false }}
    >
      <Row gutter={12}>
        <Col span={14}>
          <Form.Item name="producto">
            <Select
              showSearch
              loading={loading}
              onSearch={onSearch}
              style={{ width: "100%" }}
              onChange={onChange}
            >
              {dataListArticulo.map((producto) => (
                <Option
                  key={producto.codigo}
                  item={producto}
                  value={producto.nombre}
                >
                  {producto.nombre + " / " + producto.precio}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Cantidad" name="cantidad">
            <InputNumber
              onChange={(e) => onChange(setTotal(productoSeleccionado.precio * e))}
              ref={refCantidad}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Gramos" name="gramos">
            <InputNumber
              // onChange={(e) => onChange1(setTotal(productoSeleccionado.precio * e))}
              ref={refGramos}
            />
          </Form.Item>
        </Col>
        <Col span={4} offset={16}>
          <Form.Item label="Total">
            <Text>{total}</Text>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Agregar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SelectProducto;
