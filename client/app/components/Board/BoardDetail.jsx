import React, { Component } from 'react';
import { Row, Card, Col, Icon, Modal } from 'antd';
import ListCard from '../List/ListCard';
import Spinner from '../Tools/Spinner';

export default class BoardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAllLists(this.props.params.id)
  }

  render() {
    const { isSignedIn, lists, isLoading, createBoard } = this.props;
    const listIndex = lists ? lists.map(list => <ListCard list={list} />) : [];
    listIndex.push(
      <Col xs={12} sm={8} md={6} key="createList">
        <Card style={{ margin: "10px", backgroundColor: "#f1f1f1" }}>
          <a style={{ color: "#2a71a5" }}>
            <h2><Icon style={{ margin: "10px" }} type="plus-square-o" />New Board</h2>
          </a>
        </Card>
      </Col>,
    );
    return (
      <div className="board-detail-container">
        <Row>
          { isLoading ? <div style={{ height: "300px" }}><Spinner /></div> :
            listIndex
          }
        </Row>
      </div>
    );
  }
}
