import React from 'react';
import { connect } from 'dva';
import {query} from '../services/example';


function User({count, dispatch}) {
  return (
    <div>
      <h2>{ count }</h2>
      <button key="add" onClick={() => { dispatch({type: 'count/add'})}}>+</button>
      <button key="minus" onClick={() => { dispatch({type: 'count/minus'})}}>-</button>
      <button key="query" onClick={() => { query()}}>query</button>
    </div>
  );
}

function mapStateToProps(state) {
  return { count: state.count };
}


User.propTypes = {
};

export default connect(mapStateToProps)(User);
