import createDataContext from "./createDataContext";
import { database } from "../db/database"

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'get_transactions':
      return action.payload;
    case "add_transaction":
      return [
        ...state,
        {
          "ID": action.payload["ID"],
          "Amount": action.payload["Amount"],
          "Date": action.payload["Date"],
          "Description": action.payload["Description"],
          "Tag": action.payload["Tag"],
          "Category": action.payload["Category"],
        },
      ];
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

const addTransaction = dispatch => {
  return async (amount, date, description, tag, tagLabel, categoryLabel, category) => {
    const response = await database.addTransaction(amount, date, description, tag, category);
    console.log("this is what response is for addTransaction: " + response)

    dispatch({
      type: "add_transaction",
      payload: {"ID": response, "Amount": amount, "Date": date, "Description": description, "Tag": tagLabel, "Category": categoryLabel }
    });
  };
};

export const { Context, Provider } = createDataContext(
    transactionReducer,
  { getTransactions, addTransaction },
  []
);