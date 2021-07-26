import createDataContext from "./createDataContext";
import { database } from "../db/database"

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'get_transactions':
      return action.payload;
    case 'edit_transaction':
      return state.map(transaction => {
        return transaction.ID === action.payload.ID ? action.payload : transaction;
      });
    case 'delete_transaction':
      return state.filter(tag => tag["ID"] !== action.payload);
    case "add_transaction":
      return [
        ...state,
        {
          "ID": action.payload["ID"],
          "Amount": action.payload["Amount"],
          "Date": action.payload["Date"],
          "Description": action.payload["Description"],
          "TagID": action.payload["TagID"],
          "Tag": action.payload["Tag"],
          "CategoryLabel": action.payload["CategoryLabel"],
          "CategoryValue": action.payload["CategoryValue"],
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
  return async (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue, callback) => {
    const response = await database.addTransaction(amount, date, description, tag, categoryID);
    console.log("this is what response is for addTransaction: " + response)

    dispatch({
      type: "add_transaction",
      payload: {"ID": response, "Amount": amount, "Date": date, "Description": description, "TagID": tag, "Tag": tagLabel, "CategoryLabel": categoryLabel, "CategoryValue": categoryValue }
    });
    if (callback) {
      callback();
    }
  };
};

const editTransaction = dispatch => {
  return async (ID, amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue, callback) => {
    await database.updateTransaction(ID, amount, categoryID, date, description, tag);

    dispatch({
      type: 'edit_transaction',
      payload: {"ID": ID, "Amount": amount, "Date": date, "Description": description, "TagID": tag, "Tag": tagLabel, "CategoryLabel": categoryLabel, "CategoryValue": categoryValue }
    });
    if (callback) {
      callback();
    }
  };
};

const deleteTransaction = dispatch => {
  return async ID => {
    await database.deleteTransaction(ID);

    dispatch({ type: 'delete_transaction', payload: ID });
  };
};

export const { Context, Provider } = createDataContext(
    transactionReducer,
  { getTransactions, addTransaction, editTransaction, deleteTransaction },
  []
);