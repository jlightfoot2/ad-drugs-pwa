import {T2_APP_MESSAGE_CLEAR, T2_APP_MESSAGE_START} from '../actions';

const defaultView = {
  flash: {
    message: '',
    open: false
  }
};



const view = (state = defaultView, action) => {

  switch (action.type) {
    case T2_APP_MESSAGE_START:
      state.flash = {...state.flash, message: action.message, open: true}
      state = {...state};
      break;
    case T2_APP_MESSAGE_CLEAR:
      state.flash = {...state.flash, message: '', open: false}
      state = {...state};
      break;
    default:
      // code...
      break;
  }
  
  return state;
}

export default view;



