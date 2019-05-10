import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags/tags';
import CreateStyle from './create.style';

const Create = (props) => {
  /** Returns the props for the component. */
  const linkProps = () => {
    const { ...componentProps } = props;

    componentProps.iconAlign = 'right';
    componentProps.icon = 'add';
    return componentProps;
  };

  return (
    <CreateStyle
      { ...linkProps() } { ...tagComponent('create', props) }
    >
      { props.children }
    </CreateStyle>
  );
};

Create.propTypes = {
  /** Children elements */
  children: PropTypes.node,
  /** Custom className */
  className: PropTypes.string,
  /** Props for the link */
  linkProps: PropTypes.object
};

export default Create;
