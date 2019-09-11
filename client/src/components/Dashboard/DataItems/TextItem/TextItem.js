import React from 'react';
import PropTypes from 'prop-types';


export const TextItem = (props) => {
  const { data } = props;

  let view;
  if (data === 'No data') {
    view = data;
  } else {
    view = `${data} over the past 30 days`
  }

  return (
    <p>
      {view}
    </p>
  );
};

TextItem.propTypes = {
  data: PropTypes.string.isRequired,
};

export default TextItem;
