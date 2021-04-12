import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/Context";
import Create from "./CreateEdit";
import List from "./List";
import { Tabs } from "antd";
import { EditOutlined, FormOutlined, UnorderedListOutlined } from "@ant-design/icons";

const Index = () => {
  const {
    cargarListaDomicilio,
    dataTableDomicilio,
    dataFormDomicilio,
    setDataFormDomicilio,
    dataTableSucursal,
    cargarListaSucursales,
    actualizarDomicilio, activeTap, setActiveTap, domiciliarioBySucursal
  } = useContext(DataContext);

  const { TabPane } = Tabs;

  useEffect(() => {
    try {
      cargarListaDomicilio();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      cargarListaSucursales();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = activeKey => {
    setDataFormDomicilio(undefined)
    setActiveTap(activeKey)
  };
  return (
    <>
      <Tabs 
      onChange={onChange}
      activeKey={activeTap}>
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
              Listar
            </span>
          }
          key="1"
        >
          <List
            dataTable={dataTableDomicilio}
            setDataForm={setDataFormDomicilio}
            setActiveTap={setActiveTap}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FormOutlined />
              Crear
            </span>
          }
          key="2"
        >
          <Create  listSucursales={dataTableSucursal}
          domiciliarioBySucursal={domiciliarioBySucursal}
          activeTap={activeTap}
          />
        </TabPane>
        <TabPane
          disabled 
          tab={
            <span>
              <EditOutlined />
              Actualizar
            </span>
          }
          key="3"
        >
          <Create 
          activeTap={activeTap}
          setActiveTap={setActiveTap}
          dataForm={dataFormDomicilio} 
          actualizarData={actualizarDomicilio}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Index;
