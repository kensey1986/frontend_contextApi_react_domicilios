import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/Context";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";
import { Tabs } from "antd";
import { EditOutlined, FormOutlined, UnorderedListOutlined } from "@ant-design/icons";

const Index = () => {
  const {
    cargarListaBarrios,
    dataTableBarrio,
    setDataFormBarrio,
    dataFormBarrio,
    activeTap, setActiveTap,
  } = useContext(DataContext);

  const { TabPane } = Tabs;

  useEffect(() => {
    try {
      cargarListaBarrios();
     
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = activeKey => {
    setDataFormBarrio(undefined)
    setActiveTap(activeKey)
  };

  console.log(dataTableBarrio)
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
            dataTable={dataTableBarrio}
            setDataForm={setDataFormBarrio}
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
          <Create />
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
          dataForm={dataFormBarrio}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Index;
