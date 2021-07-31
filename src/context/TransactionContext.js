import createDataContext from "./createDataContext";
import { database } from "../db/database"

const mapTagsDelete = transaction => {
  transaction["TagID"] = null;
  transaction["Tag"] = null;
  return transaction;
}

const mapTagsEdit = (transaction, name) => {
  transaction["Tag"] = name;
  return transaction;
}

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'get_transactions':
      return action.payload;
    case 'edit_transaction':
      return state.map(transaction => {
        return transaction["ID"] === action.payload["ID"] ? action.payload : transaction;
      });
    case 'delete_transaction_tag':
      return state.map(transaction => {
        return transaction["TagID"] === action.payload ? mapTagsDelete(transaction) : transaction;
      });
    case 'edit_category_name': //WORK HERE
      return state.map(transaction => {
        if (transaction["CategoryValue"] === "one") {
          transaction["CategoryLabel"] = action.payload.labelOne;
          return transaction;
        } else if (transaction["CategoryValue"] === "two") {
          transaction["CategoryLabel"] = action.payload.labelTwo;
          return transaction;
        } else if (transaction["CategoryValue"] === "three") {
          transaction["CategoryLabel"] = action.payload.labelThree;
          return transaction;
        }
      });
    case 'edit_transaction_tag':
    return state.map(transaction => {
      return transaction["TagID"] === action.payload["TagID"] ? mapTagsEdit(transaction, action.payload["Tag"]) : transaction;
    });
    case 'delete_transaction':
      return state.filter(transaction => transaction["ID"] !== action.payload);
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

const deleteTransactionTag = dispatch => {
  return ID => {

    dispatch({ type: 'delete_transaction_tag', payload: ID });
  };
};

const editTransactionTag = dispatch => {
  return (ID, name) => {

    dispatch({ type: 'edit_transaction_tag', payload: {"TagID": ID, "Tag": name}});
  };
};

const editCategoryName = dispatch => {
  return (labelOne, labelTwo, labelThree) => {

    dispatch({ type: 'edit_category_name', payload: {labelOne, labelTwo, labelThree} });
  };
};

export const { Context, Provider } = createDataContext(
    transactionReducer,
  { getTransactions, addTransaction, editTransaction, deleteTransaction, deleteTransactionTag, editTransactionTag, editCategoryName },
  []
);