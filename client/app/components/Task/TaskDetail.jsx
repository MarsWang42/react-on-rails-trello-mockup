import React, { Component } from 'react';
import { Spin, Row, Col, Icon, Button, Input, Alert } from 'antd';

export default class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      taskDescription: "",
    };
    this.showEditForm = this.showEditForm.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
    this.updateTaskDescription = this.updateTaskDescription.bind(this);
  }

  componentDidMount() {
    this.props.loadTaskDetail(this.props.task.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.taskDetail && nextProps.taskDetail.description !== this.state.taskDescription) {
      this.setState({
        taskDescription: nextProps.taskDetail.description,
      });
    }
  }

  updateTaskDescription(e) {
    this.setState({
      taskDescription: e.target.value,
    });
  }

  showEditForm() {
    this.setState({
      isEditing: true,
    });
  }

  hideEditForm() {
    const { updateTask, taskDetail } = this.props;
    updateTask({
      title: taskDetail.title,
      description: this.state.taskDescription,
      id: taskDetail.id,
    });
    this.setState({
      isEditing: false,
    });
  }

  render() {
    const {
      isLoading, loadingError, taskDetail,
      archiveTask, boardId, hideTaskDetailModal,
      updatingError,
    } = this.props;
    const { isEditing, taskDescription } = this.state;

    const onArchive = () => {
      hideTaskDetailModal();
      archiveTask(taskDetail.id, boardId);
    };

    return (
      <div>
        { isLoading && <Spin size="large" /> }
        { !isLoading && !loadingError && (
          <div>
            <Row>
              <Col className="task-detail-container" sm={16}>
                { updatingError && <Alert message="Updating task error." type="error" />}
                <div className="task-detail-row">
                  <Icon type="edit" /> Description:
                </div>
                <div className="task-detail-row description-container">
                  { !isEditing && (
                    <div className="description-text" onClick={this.showEditForm}>
                      { taskDescription }
                    </div>
                  )}
                  { isEditing && (
                    <Input.Search
                      className="description-form"
                      type="textarea"
                      value={taskDescription}
                      onChange={this.updateTaskDescription}
                      onBlur={this.hideEditForm}
                      onSearch={this.hideEditForm}
                      autoFocus
                      rows={4}
                    />
                  )}
                </div>
                <div className="task-detail-row">
                  <Icon type="user" /> Created By: { taskDetail && taskDetail.createdBy }
                </div>
                <div className="task-detail-row">
                  <Icon type="calendar" /> Last Updated: { taskDetail && taskDetail.updatedAt }
                </div>
              </Col>
              <Col sm={8} className="task-action-container">
                <Row><h2><Icon type="switcher" /> Actions</h2></Row>
                <Row className="action-button">
                  <Button type="primary" onClick={onArchive}>
                    <Icon type="folder" /> Archive
                  </Button>
                </Row>
              </Col>
            </Row>
          </div>
        ) }
      </div>
    );
  }

}
