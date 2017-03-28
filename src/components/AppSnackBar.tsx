import * as React from "react";
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';


/**
 * AppSnackBar is a message box that slides up from the button of the screen
 * temporarily
 *
 * This box will appear when state.view.flash.open == true
 */
export interface MyProps {
  message: string;
  open: boolean;
}
export interface MyState {
  open: boolean;
}

export default class AppSnackBar extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
      if(nextProps.open && !this.state.open){
        this.setState({open: true})
      }
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {message} = this.props;
    return (
        <Snackbar
          open={this.state.open}
          message={message}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
    );
  }
}
