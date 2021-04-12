import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/Context";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";
import { Tabs } from "antd";
import {
  EditOutlined,
  FormOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const Index = () => {
  const {
    cargarListaCliente,
    dataTableCliente,
    dataFormCliente,
    setDataFormCliente,
    activeTap,
    setActiveTap,
  } = useContext(DataContext);

  const { TabPane } = Tabs;

  useEffect(() => {
    try {
      cargarListaCliente();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onChange = (activeKey) => {
    setDataFormCliente(undefined);
    setActiveTap(activeKey);
  };
  return (
    <>
      <Tabs onChange={onChange} activeKey={activeTap}>
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
            dataTable={dataTableCliente}
            setDataForm={setDataFormCliente}
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
          <Create   />
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
          <Edit
            activeTap={activeTap}
            setActiveTap={setActiveTap}
            dataForm={dataFormCliente}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Index;
