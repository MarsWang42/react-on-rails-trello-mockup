import React, { Component } from 'react';
import { Card, Row, Button, Icon, Dropdown } from 'antd';
import NewTaskForm from '../Task/NewTaskForm';

export default class ListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskDropdownVisible: false,
    };
    this.handleNewTaskDropdownChange = this.handleNewTaskDropdownChange.bind(this);
    this.hideNewTaskDropdown = this.hideNewTaskDropdown.bind(this);
  }

  hideNewTaskDropdown() {
    this.setState({ newTaskDropdownVisible: false });
  }

  handleNewTaskDropdownChange(flag) {
    this.setState({ newTaskDropdownVisible: flag });
  }

  render() {
    const { list, createTask, boardId, isCreatingTask, creatingTaskError } = this.props;
    const cardStyle = {
      margin: "10px",
      width: "250px",
      display: "inline-block",
      verticalAlign: "top",
    };
    const bodyStyle = {
      padding: "12px 24px",
      fontSize: "11px",
      color: "#777777",
    };
    const taskStyle = {
      width: "100%",
      padding: "5px 0",
      margin: "5px 0",
    };
    const taskList = list.tasks.map(task => (
      <Row key={task.id}>
        <Button style={taskStyle}>{ task.title }</Button>
      </Row>
      ),
    );
    const newTaskForm = (
      <NewTaskForm
        onFormSubmit={createTask}
        listId={list.id}
        boardId={boardId}
        hideDropdown={this.hideNewTaskDropdown}
        isCreating={isCreatingTask}
        creatingError={creatingTaskError}
      />
    );
    taskList.push(
      <Row key="createTask">
        <Dropdown
          overlay={newTaskForm}
          trigger={['click']}
          onVisibleChange={this.handleNewTaskDropdownChange}
          visible={this.state.newTaskDropdownVisible}
        >
          <Button key="createTask" style={taskStyle} type="primary">
            <Icon type="plus" />Add a Task
          </Button>
        </Dropdown>
      </Row>,
    );
    return (
      <Card title={list.title} style={cardStyle} bodyStyle={bodyStyle}>
        { taskList }
      </Card>
    );
  }
}
