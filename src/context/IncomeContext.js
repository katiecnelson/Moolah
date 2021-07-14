import createDataContext from "./createDataContext";
import { database } from "../db/database";


const IncomeReducer = (state, action) => {
  switch (action.type) {
    case 'get_income':
      return action.payload;
    default:
      return state;
  }
};

const getIncome = dispatch => {
  return async () => {
    const response = await database.getIncome();
    const data = await response[0]["Amount"];
    console.log("this is what data is: " + data)

    dispatch({ type: 'get_income', payload: {amount: data} });
  };
};


export const { Context, Provider } = createDataContext(
  IncomeReducer,
  { getIncome },
  []
);