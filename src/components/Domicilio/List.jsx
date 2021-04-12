import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import React, { Component } from 'react'


// TODO: PASAR ESTA CLASE A HOOKS


class List extends Component  {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Digite ... `}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const {
      dataTable,
      setDataForm,
      setActiveTap,
    } = this.props;
    const rowSelected = (record) => {
      setDataForm(record);
      setActiveTap("3")
    };

    const headerTable = [
      
      {
        title: "Sucursal",
        dataIndex: "sucursal.name",
        render: (text, record) => (
          <Space size="middle">
            <p>{record.sucursal.name}</p>
          </Space>
        ),
        key: 'sucursal.name',
        width: '20%',
      },
      {
        title: "Domiciliario",
        dataIndex: "delivery.name",
        render: (text, record) => (
          <Space size="middle">
            <p>{record.delivery.name}</p>
          </Space>
        ),
        key: 'delivery.name',
        width: '20%',
        //...this.getColumnSearchProps('_id',),
      },
     
    ];
    return <Table columns={headerTable} 
    dataSource={dataTable} 
    onRow={(record) => {
      return {
        onDoubleClick: (event) => {
          rowSelected(record);
        },
      };
    }}/>
  }
}

export default List;

 