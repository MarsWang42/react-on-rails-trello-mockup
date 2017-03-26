import React, { Component } from 'react';
import { Card, Col } from 'antd';

export default class ListCard extends Component {
  render() {
    const { list } = this.props;
    const bodyStyle = {
      padding: "12px 24px",
      fontSize: "11px",
      color: "#777777",
    };
    return (
      <Col xs={12} sm={8} md={6}>
        <Card title={list.title} style={{ margin: "10px" }} bodyStyle={bodyStyle}>
          Updated { list.updatedAt }
        </Card>
      </Col>
    );
  }
}
