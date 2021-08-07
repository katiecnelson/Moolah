/**
 * This code comes from Stephen Grider's Udemy course: 
 * The Complete React Native + Hooks Course, 138. More Automatic Context Creation
 * https://www.udemy.com/course/the-complete-react-native-and-redux-course/
 */

import React, {useReducer} from "react";

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};