import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Context";

import { Table, Tag, Space, InputNumber } from "antd";

const TableDomicilio = (props) => {
  const { dataTablePedido, setDataTablePedido } = useContext(DataContext);

  const rowSelected = (record) => {
    setDataTablePedido(record);
  };


  const onChange = (e,record)=>{
    const newData = dataTablePedido.map(item=>{
      if(item.codigo===record.codigo){
       item.cantidad = e;
    }
    return item;
    })
    setDataTablePedido(newData)
    }

    const onChange1 = (e,record)=>{
      const newData = dataTablePedido.map(item=>{
        if(item.codigo===record.codigo){
         item.gramos = e;
      }
      return item;
      })
      setDataTablePedido(newData)
      }

  const headerTable = [
    {
      title: "N°",
      dataIndex: "key",
      key: "key",
      width: "5%",
    },
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
      width: "10%",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: "30%",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      width: "30%",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      width: "30%",
      render: (text, record) => (
        <InputNumber value={text} onChange={(e) => onChange(e, record)} />
      ),
    },
    {
      title: "Gramos",
      dataIndex: "gramos",
      key: "gramos",
      width: "30%",
      render: (text, record) => (
        <InputNumber value={text} onChange={(e) => onChange1(e, record)} />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={headerTable}
        dataSource={dataTablePedido}
        onRow={(record) => {
          return {
            onDoubleClick: (event) => {
              rowSelected(record);
            },
          };
        }}
      />
    </div>
  );
};

export default TableDomicilio;
