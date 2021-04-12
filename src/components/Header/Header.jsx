import React from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import { UserOutlined, } from '@ant-design/icons'

const Header = props => {
  const { Header } = Layout
  const { SubMenu } = Menu

  const userName = JSON.parse(localStorage.getItem('usuarioNombre'))
  const { logeado, destruirSesion } = props

  return (
    <>
      {logeado ? (
        <Header>
          <Row justify='end'>
            <Col span={21}>
            </Col>
            <Col span={3}>
              <Menu
                theme='dark'
                mode='horizontal'
                defaultSelectedKeys={['sub1']}
              >
                <SubMenu key='sub1' icon={<UserOutlined />} title={userName}>
                  <Menu.Item onClick={destruirSesion} key='salir'>
                    Salir
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </Header>
      ) : null}
    </>
  )
}

export default Header
