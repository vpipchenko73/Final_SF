import React from "react";
import ReactDOM from "react-dom";


import { Provider } from "react-redux";

import App from "./App.js";

import { createStore } from "redux"

const defaultState = {
  key: '',
  id_u: '',
  name_u: '',
  role_u: 'anonim',
  username_u: '',
  refreshKey: 0
}

function reduser(state = defaultState, action) {
  //console.log('1', state)
  switch (action.type) {
    case 'KEY':
      return {
        ...state,
        //vid: [...state.vid, action.payload]
        key: action.payload
      }
    case 'ID':
      return {
        ...state,
        //tip: [...state.tip, action.payload]
        id_u: action.payload
      }
    case 'NAME':
      return {
        ...state,
        //tip: [...state.tip, action.payload]
        name_u: action.payload
      }
    case 'ROLE':
      return {
        ...state,
        //tip: [...state.tip, action.payload]
        role_u: action.payload
      }
      case 'USERNAME':
        return {
          ...state,
          //tip: [...state.tip, action.payload]
          username_u: action.payload
        }  
    case 'REFRESHKEY':
      return {
        ...state,
        //tip: [...state.tip, action.payload]
        refreshKey: action.payload
      }
    //break
    default:
      return state
  }


}

const store = createStore(reduser)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >, document.getElementById("root")

);
