import { connect } from 'react-redux';
import { setVisibilityFilter } from '../stores/actions';
import Link from '../components/Link';

// 设定active状态
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

// 分发onClick事件，执行setVisibilityFilter
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

// 通过将数据连接到Link组件
const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
