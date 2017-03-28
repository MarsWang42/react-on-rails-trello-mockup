import React, { Component } from 'react';
import { Spin, Row, Col, Icon, Button } from 'antd';

export default class TaskDetail extends Component {
  componentDidMount() {
    this.props.loadTaskDetail(this.props.task.id);
  }
  render() {
    const {
      isLoading, loadingError, taskDetail,
      archiveTask, boardId, hideTaskDetailModal
    } = this.props;

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
