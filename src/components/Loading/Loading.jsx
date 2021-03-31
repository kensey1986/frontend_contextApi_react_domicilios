import React from "react";
import { Modal, Spin, Space } from "antd";
import {} from "antd";

const Loading = (props) => {
  const { visibleLoading } = props;
  return (
    <Modal
    centered
    visible={visibleLoading}
    footer={null}
    closable={false}
    width={80}
    >
      <Space size="small" >
        <Spin size="large" />
      </Space>
    </Modal>
  );
};

export default Loading;
