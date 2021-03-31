import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/Context";
import Create from "./CreateEdit";
import List from "./List";
import { Tabs } from "antd";
import { EditOutlined, FormOutlined, UnorderedListOutlined } from "@ant-design/icons";

const Index = () => {
  const {
    cargarListaDomiciliarios,
    dataTableDelivery,
    dataFormDelivery,
    setDataFormDelivery,
    actualizarDomiciliario, activeTap, setActiveTap
  } = useContext(DataContext);

  const { TabPane } = Tabs;

  useEffect(() => {
    try {
      cargarListaDomiciliarios();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = activeKey => {
    setDataFormDelivery(undefined)
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
            cargarListaDomiciliarios={cargarListaDomiciliarios}
            dataTableDelivery={dataTableDelivery}
            setDataFormDelivery={setDataFormDelivery}
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
          <Create 
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
          dataForm={dataFormDelivery} 
          actualizarDomiciliario={actualizarDomiciliario}/>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Index;
