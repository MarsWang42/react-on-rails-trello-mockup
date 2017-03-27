// Simple example of a React "smart" component

import { connect } from 'react-redux';
import BoardDetail from '../components/Board/BoardDetail';
import { loadBoardDetail } from '../actions/boardActionCreators';
import { createList } from '../actions/listActionCreators';
import { createTask } from '../actions/taskActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  lists: state.list.all,
  isLoading: state.board.detailIsLoading,
  loadingError: state.board.detailError,
  currentBoard: state.board.currentBoard,
  isCreatingList: state.list.isCreating,
  creatingListError: state.list.creatingError,
  isCreatingTask: state.task.isCreating,
  creatingTaskError: state.task.creatingError,

});

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, { loadBoardDetail, createList, createTask })(BoardDetail);
