import createDataContext from "./createDataContext";
import { database } from "../db/database"

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'get_transactions':
      return action.payload;
    default:
      return state;
  }
};

const getTransactions = dispatch => {
  return async () => {
    const response = await database.getAllTransactions();
    console.log("This is how many things are in getAllTransactions array: " + response.length)

    dispatch({ type: 'get_transactions', payload: response });
  };
};

export const { Context, Provider } = createDataContext(
    transactionReducer,
  { getTransactions },
  []
);