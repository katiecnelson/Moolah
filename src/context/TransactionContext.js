import createDataContext from "./createDataContext";
import {database} from "../db/database";

// Helper function to remove deleted tags from transactions
const mapTagsDelete = transaction => {
  transaction["TagID"] = null;
  transaction["Tag"] = null;
  return transaction;
};
// Helper function to update edited tags on a transaction
const mapTagsEdit = (transaction, name) => {
  transaction["Tag"] = name;
  return transaction;
};

/*
 * Reducer that takes actions and data and updates the global state of
 * transactions data accordingly
 */

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "get_transactions":
      return action.payload;
    case "delete_transaction_tag":
      return state.map(transaction => {
        return transaction["TagID"] === action.payload
        ? mapTagsDelete(transaction)
        : transaction;
      });
    case "edit_category_name":
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
    case "edit_transaction_tag":
    return state.map(transaction => {
      return transaction["TagID"] === action.payload["TagID"]
      ? mapTagsEdit(transaction, action.payload["Tag"])
      : transaction;
    });
    case "delete_transaction":
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

/*
 * Fetches all transaction data from the database and sends the
 * information to the reducer (above) to update the global state
 */

const getTransactions = dispatch => {
  return async () => {
    const response = await database.getAllTransactions();

    dispatch({type: "get_transactions", payload: response});
  };
};

/*
 * Adds a transaction to the database and sends the
 * information to the reducer (above) to update the global state
 */

const addTransaction = dispatch => {
  return async (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
    const response = await database.addTransaction(amount, date, description, tag, categoryID);

    dispatch({
      type: "add_transaction",
      payload: {
        "ID": response,
        "Amount": amount,
        "Date": date,
        "Description": description,
        "TagID": tag,
        "Tag": tagLabel,
        "CategoryLabel": categoryLabel,
        "CategoryValue": categoryValue
      }
    });
  };
};

/*
 * Edits a transaction's data in the database.
 * This function does not update the state in the global context
 * because the data can be complicated. Instead, the data is re-fetched
 * from the database to update the state when transactions are edited
 */

const editTransaction = () => {
  return async (ID, amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue, callback) => {
    await database.updateTransaction(ID, amount, categoryID, date, description, tag);
      callback();
  };
};

/*
 * Deletes a transaction from the database and sends the
 * information to the reducer (above) to update the global state
 */

const deleteTransaction = dispatch => {
  return async ID => {
    await database.deleteTransaction(ID);

    dispatch({type: "delete_transaction", payload: ID});
  };
};

// Updates the global state for transactions when a tag is deleted
const deleteTransactionTag = dispatch => {
  return ID => {

    dispatch({type: "delete_transaction_tag", payload: ID});
  };
};

// Updates the global state for transactions when a tag is edited
const editTransactionTag = dispatch => {
  return (ID, name) => {

    dispatch({ type: "edit_transaction_tag", payload: {"TagID": ID, "Tag": name}});
  };
};

// Updates the global state for transactions when a category is edited
const editCategoryName = dispatch => {
  return (labelOne, labelTwo, labelThree) => {

    dispatch({type: "edit_category_name", payload: {labelOne, labelTwo, labelThree}});
  };
};

export const {Context, Provider} = createDataContext(
    transactionReducer,
  { 
    getTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    deleteTransactionTag,
    editTransactionTag,
    editCategoryName
  },
  []
);