import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import React, { Component } from "react";

// TODO: PASAR ESTA CLASE A HOOKS
class List extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Digite ... `}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { dataTable, setDataForm, setActiveTap } = this.props;

    const rowSelected = (record) => {
      setDataForm(record);
      setActiveTap("3");
    };

    const headerTable = [
      {
        title: "Nombre",
        dataIndex: "name",
        render: (text, record) => (
          <Space size="middle">
            <a href="##">{record.name}</a>
          </Space>
        ),
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Telefono",
        dataIndex: "telefono",
        render: (text, record) => (
          <Space size="middle">
            <a href="##">{record.telefono}</a>
          </Space>
        ),
        key: "telefono",
        width: "15%",
        ...this.getColumnSearchProps("telefono"),
      },
      {
        title: "Celular",
        dataIndex: "celular",
        render: (text, record) => (
          <Space size="middle">
            <a href="##">{record.celular}</a>
          </Space>
        ),
        key: "celular",
        width: "15%",
        ...this.getColumnSearchProps("celular"),
      },
      {
        title: "Emeil",
        dataIndex: "emeil",
        render: (text, record) => (
          <Space size="middle">
            <a href="##">{record.emeil}</a>
          </Space>
        ),
        key: "emeil",
        width: "15%",
        ...this.getColumnSearchProps("emeil"),
      },
      // {
      //   title: "Barrio",
      //   dataIndex: "barrio.name",
      //   render: (text, record) => (
      //     <Space size="middle">
      //       {record.barrio.name ? <p>{record.barrio.name}</p> : null}
      //     </Space>
      //   ),
      //   key: "apellido",
      //   width: "20%",
      // },
    ];
    return (
      <>
        {dataTable ? (
          <Table
            columns={headerTable}
            dataSource={dataTable}
            onRow={(record) => {
              return {
                onDoubleClick: (event) => {
                  rowSelected(record);
                },
              };
            }}
          />
        ) : null}
      </>
    );
  }
}

export default List;
