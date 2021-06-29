
import React from 'react'

class Input extends React.PureComponent {
  render () {
    let { forwardedRef, ...otherProps } = this.props;
    return <input { ...otherProps } ref={ forwardedRef } />;
  }
}

const TextInput = React.forwardRef( ( props, ref ) => {
  return <Input { ...props } forwardedRef={ ref } />
} );

class FocusableInput extends React.Component {
  state = {
    focusedState: false
  }
  ref = React.createRef()

  render () {
    return <TextInput ref={ this.ref } />;
  }

  // When the focused prop is changed from false to true, 
  // and the input is not focused, it should receive focus.
  // If focused prop is true, the input should receive the focus.
  // Implement your solution below:
  componentDidUpdate ( prevProps ) {
    if ( this.props.focused && !prevProps.focused && document.activeElement !== this.ref.current ) {
      this.ref.current.focus()
    }
    if ( this.props.focused ) {
      this.ref.current.focus()
    }
  }

  componentDidMount () {
    this.setState( {
      focusedState: true
    } );
  }

}

FocusableInput.defaultProps = {
  focused: false
};

export default FocusableInput