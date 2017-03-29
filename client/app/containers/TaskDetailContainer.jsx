// Simple example of a React "smart" component

import { connect } from 'react-redux';
import TaskDetail from '../components/Task/TaskDetail';
import { loadTaskDetail, archiveTask, updateTask } from '../actions/taskActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = state => ({
  isLoading: state.task.detailIsLoading,
  taskDetail: state.task.taskDetail,
  loadingError: state.task.detailError,
  boardId: state.board.boardDetail && state.board.boardDetail.id,
  updatingError: state.task.updatingError,
});

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, { loadTaskDetail, archiveTask, updateTask })(TaskDetail);
