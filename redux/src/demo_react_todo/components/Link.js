import React from 'react';
import PropTypes from 'prop-types';

// 通过FilterLink.js 连接传入的props参数
// FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
