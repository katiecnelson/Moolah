import createDataContext from "./createDataContext";
import {database} from "../db/database";
import {getToSpend, calculateRemaining, percentSpent} from "../utilities/helper";

/*
 * Reducer that takes actions and data and updates the global state of
 * income and category data accordingly
 */

const CategoryIncomeReducer = (state, action) => {
  switch (action.type) {
    case "get_categories_income":
      return action.payload;
    case "update_categories_income":
      return {
        income: action.payload.income,

        valueOne: action.payload.valueOne,
        labelOne: action.payload.labelOne, 
        toSpendOne: action.payload.toSpendOne,
        spentOne: state.spentOne,
        remainingOne: calculateRemaining(getToSpend(action.payload.income, action.payload.percentOne), state.spentOne),
        percentSpentOne: percentSpent(getToSpend(action.payload.income, action.payload.percentOne), state.spentOne),
        percentOne: action.payload.percentOne, 

        valueTwo: action.payload.valueTwo,
        labelTwo: action.payload.labelTwo,
        toSpendTwo: action.payload.toSpendTwo,
        spentTwo: state.spentTwo,
        remainingTwo: calculateRemaining(getToSpend(action.payload.income, action.payload.percentTwo), state.spentTwo),
        percentSpentTwo: percentSpent(getToSpend(action.payload.income, action.payload.percentTwo), state.spentTwo),
        percentTwo: action.payload.percentTwo,

        valueThree: action.payload.valueThree,
        labelThree: action.payload.labelThree,
        toSpendThree: action.payload.toSpendThree,
        spentThree: state.spentThree,
        remainingThree: calculateRemaining(getToSpend(action.payload.income, action.payload.percentThree), state.spentThree),
        percentSpentThree: percentSpent(getToSpend(action.payload.income, action.payload.percentThree), state.spentThree),
        percentThree: action.payload.percentThree,
      };
    case "categories_delete_transaction":
      if (action.payload.category === "one") {
        return {
          ...state,
          spentOne: state.spentOne - action.payload.amount,
          remainingOne: calculateRemaining(getToSpend(state.income, state.percentOne), state.spentOne - action.payload.amount),
          percentSpentOne: percentSpent(getToSpend(state.income, state.percentOne), state.spentOne - action.payload.amount),
        };
      } else if (action.payload.category === "two") {
        return {
          ...state,
          spentTwo: state.spentTwo - action.payload.amount,
          remainingTwo: calculateRemaining(getToSpend(state.income, state.percentTwo), state.spentTwo - action.payload.amount),
          percentSpentTwo: percentSpent(getToSpend(state.income, state.percentTwo), state.spentTwo - action.payload.amount),
        };
      } else if (action.payload.category === "three") {
        return {
          ...state,
          spentThree: state.spentThree - action.payload.amount,
          remainingThree: calculateRemaining(getToSpend(state.income, state.percentThree), state.spentThree - action.payload.amount),
          percentSpentThree: percentSpent(getToSpend(state.income, state.percentThree), state.spentThree - action.payload.amount),
        };
      }
    case "categories_add_transaction":
      if (action.payload.category === "one") {
        return {
          ...state,
          spentOne: state.spentOne + action.payload.amount,
          remainingOne: calculateRemaining(getToSpend(state.income, state.percentOne), state.spentOne + action.payload.amount),
          percentSpentOne: percentSpent(getToSpend(state.income, state.percentOne), state.spentOne + action.payload.amount),
        };
      } else if (action.payload.category === "two") {
        return {
          ...state,
          spentTwo: state.spentTwo + action.payload.amount,
          remainingTwo: calculateRemaining(getToSpend(state.income, state.percentTwo), state.spentTwo + action.payload.amount),
          percentSpentTwo: percentSpent(getToSpend(state.income, state.percentTwo), state.spentTwo + action.payload.amount),
        };
      } else if (action.payload.category === "three") {
        return {
          ...state,
          spentThree: state.spentThree + action.payload.amount,
          remainingThree: calculateRemaining(getToSpend(state.income, state.percentThree), state.spentThree + action.payload.amount),
          percentSpentThree: percentSpent(getToSpend(state.income, state.percentThree), state.spentThree +action.payload.amount),
        };
      }
    default:
      return state;
  }
};

/*
 * Fetches all category and income data from the database and sends the
 * information to the reducer (above) to update the global state
 */

const getCategoriesIncome = dispatch => {
  return async () => {
    const categories = await database.getAllCategories();
    const incomeCall = await database.getIncome();
    const spent = await database.getSpent();
    const income = await incomeCall[0]["Amount"];
    const spentOne = spent.find(category => category["Category"] === 1) ? spent.find(category => category["Category"] === 1)["SUM(Amount)"]: 0;
    const spentTwo = spent.find(category => category["Category"] === 2) ? spent.find(category => category["Category"] === 2)["SUM(Amount)"]: 0;
    const spentThree = spent.find(category => category["Category"] === 3) ? spent.find(category => category["Category"] === 3)["SUM(Amount)"]: 0;
    const percentOne = categories[0]["Percent"];
    const percentTwo = categories[1]["Percent"];
    const percentThree = categories[2]["Percent"];

    dispatch({ type: "get_categories_income", payload: {
      income: income,

      valueOne: categories[0]["CategoryValue"],
      labelOne: categories[0]["CategoryLabel"], 
      toSpendOne: getToSpend(income, percentOne),
      spentOne: spentOne,
      remainingOne: calculateRemaining(getToSpend(income, percentOne), spentOne),
      percentSpentOne: percentSpent(getToSpend(income, percentOne), spentOne),
      percentOne: percentOne, 

      valueTwo: categories[1]["CategoryValue"],
      labelTwo: categories[1]["CategoryLabel"],
      toSpendTwo: getToSpend(income, percentTwo),
      spentTwo: spentTwo,
      remainingTwo: calculateRemaining(getToSpend(income, percentTwo), spentTwo),
      percentSpentTwo: percentSpent(getToSpend(income, percentTwo), spentTwo),
      percentTwo: percentTwo,

      valueThree: categories[2]["CategoryValue"],
      labelThree: categories[2]["CategoryLabel"],
      toSpendThree: getToSpend(income, percentThree),
      spentThree: spentThree,
      remainingThree: calculateRemaining(getToSpend(income, percentThree), spentThree),
      percentSpentThree: percentSpent(getToSpend(income, percentThree), spentThree),
      percentThree: percentThree,
      }
    });
  };
};

/*
 * Takes in changes to categories and income data from the UI and sends these changes
 * to the global state reducer (above) and to the database
 */

const updateCategoriesIncome = dispatch => {
  return async (income, newAliasOne, newPercentOne, newAliasTwo, newPercentTwo, newAliasThree, newPercentThree) => {
    await database.updateIncome(income);
    await database.updateCategories(newAliasOne, newPercentOne, newAliasTwo, newPercentTwo, newAliasThree, newPercentThree)

    dispatch({type: "update_categories_income", payload: {
      income: income,

      valueOne: "one",
      labelOne: newAliasOne, 
      toSpendOne: getToSpend(income, newPercentOne),
      percentOne: newPercentOne, 

      valueTwo: "two",
      labelTwo: newAliasTwo,
      toSpendTwo: getToSpend(income, newPercentTwo),
      percentTwo: newPercentTwo,

      valueThree: "three",
      labelThree: newAliasThree,
      toSpendThree: getToSpend(income, newPercentThree),
      percentThree: newPercentThree,
      }
    });
  };
};

// Updates changes to category state brought about by transactions being deleted
const categoriesDeleteTransaction = dispatch => {
  return (category, amount) => {
    dispatch({type: "categories_delete_transaction", payload: {category, amount}});
  };
};

// Updates changes to category state brought about by transactions being added
const categoriesAddTransaction = dispatch => {
  return (category, amount) => {
    dispatch({type: "categories_add_transaction", payload: {category, amount}});
  };
};

export const {Context, Provider} = createDataContext(
  CategoryIncomeReducer,
    {
      getCategoriesIncome,
      updateCategoriesIncome,
      categoriesDeleteTransaction,
      categoriesAddTransaction
    },
  []
);