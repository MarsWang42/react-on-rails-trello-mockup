import React, { Component } from 'react';
import { Row, Card, Col, Icon, Dropdown, Menu } from 'antd';
import ListCard from '../List/ListCard';
import NewListForm from '../List/NewListForm';
import Spinner from '../Tools/Spinner';
import EventListener from '../../helpers/eventListener';

export default class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newListDropdownVisible: false,
      height: 0,
    };
    this.handleNewListDropdownChange = this.handleNewListDropdownChange.bind(this);
    this.hideNewListDropdown = this.hideNewListDropdown.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.onResizeHeight = this.onResizeHeight.bind(this);
  }

  componentDidMount() {
    this.props.loadBoardDetail(this.props.params.id);
    const win = window;
    this.updateHeight();
    this.eventResizeWidthToken = EventListener.listen(
      win,
      'resize',
      this.onResizeHeight,
    );
  }

  onResizeHeight() {
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(this.updateHeight, 16);
  }

  updateHeight() {
    const win = window;
    if (win) {
      const newHeight = (win.innerHeight - 110);
      this.setState({ height: newHeight });
    }
  }

  hideNewListDropdown() {
    this.setState({ newListDropdownVisible: false })
  }

  handleNewListDropdownChange(flag) {
    this.setState({ newListDropdownVisible: flag });
  }

  render() {
    const {
      isSignedIn, lists, isLoading,
      createList, createTask, params,
      currentBoard, isCreatingList, isCreatingTask,
      creatingTaskError, creatingListError,
    } = this.props;
    const cardStyle = {
      margin: "10px",
      width: "300px",
      display: "inline-block",
      verticalAlign: "top",
      backgroundColor: "rgba(240,65,52,.2)",
    };
    const newListForm = (
      <NewListForm
        onFormSubmit={createList}
        boardId={params.id}
        hideDropdown={this.hideNewListDropdown}
        isCreating={isCreatingList}
        creatingError={creatingListError}
      />
    );
    const listIndex = lists ?
      lists.map(list => (
        <ListCard
          list={list}
          key={list.id}
          createTask={createTask}
          boardId={currentBoard.id}
          isCreatingTask={isCreatingTask}
          creatingTaskError={creatingTaskError}
        />)) : [];
    listIndex.push(
      <Card style={cardStyle} key="createlist">
        <Dropdown
          overlay={newListForm}
          trigger={['click']}
          onVisibleChange={this.handleNewListDropdownChange}
          visible={this.state.newListDropdownVisible}
        >
          <h2 style={{ color: "#2a71a5", cursor: "pointer" }}>
            <Icon style={{ margin: "10px" }} type="plus-square-o" />
            New List
          </h2>
        </Dropdown>
      </Card>,
    );
    return (
      <div>
        <div className="board-detail-title">
          <h2>{ currentBoard && currentBoard.title }</h2>
        </div>
        <div className="board-detail-container" style={{height: this.state.height}}>
          { isLoading ? <div style={{ height: "300px" }}><Spinner /></div> :
            listIndex
          }
        </div>
      </div>
    );
  }
}
