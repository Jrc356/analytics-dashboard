import React from 'react';
import PropTypes from 'prop-types';


export const TextItem = (props) => {
  const { data } = props;
  return (
    <p>
      {data}
    </p>
  );
};

TextItem.propTypes = {
  data: PropTypes.string.isRequired,
};

export default TextItem;
