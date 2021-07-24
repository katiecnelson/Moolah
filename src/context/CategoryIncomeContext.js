import createDataContext from "./createDataContext";
import { database } from "../db/database";
import { getToSpend, formatAmountString, calculateRemaining, percentSpent } from "../utilities/helper";


const CategoryIncomeReducer = (state, action) => {
  switch (action.type) {
    case 'get_categories_income':
      return action.payload;
    default:
      return state;
  }
};

const getCategoriesIncome = dispatch => {
  return async () => {
    const categories = await database.getAllCategories();
    const incomeCall = await database.getIncome();
    const spent = await database.getSpent();
    const income = await incomeCall[0]["Amount"];

    console.log("FROM CONTEXT: get categories and income worked!")

    dispatch({ type: 'get_categories_income', payload: {
        income: income,

        valueOne: categories[0]["CategoryValue"],
        labelOne: categories[0]["CategoryLabel"], 
        toSpendOne: formatAmountString(getToSpend(income, categories[0]["Percent"])),
        spentOne: formatAmountString(spent[0]["SUM(Amount)"]),
        remainingOne: formatAmountString(calculateRemaining(getToSpend(income, categories[0]["Percent"]), spent[0]["SUM(Amount)"])),
        percentSpentOne: percentSpent(getToSpend(income, categories[0]["Percent"]), spent[0]["SUM(Amount)"]),
        percentOne: categories[0]["Percent"], 

        valueTwo: categories[1]["CategoryValue"],
        labelTwo: categories[1]["CategoryLabel"],
        toSpendTwo: formatAmountString(getToSpend(income, categories[1]["Percent"])),
        spentTwo: formatAmountString(spent[1]["SUM(Amount)"]),
        remainingTwo: formatAmountString(calculateRemaining(getToSpend(income, categories[1]["Percent"]), spent[1]["SUM(Amount)"])),
        percentSpentTwo: percentSpent(getToSpend(income, categories[1]["Percent"]), spent[1]["SUM(Amount)"]),
        percentTwo: categories[1]["Percent"],

        valueThree: categories[2]["CategoryValue"],
        labelThree: categories[2]["CategoryLabel"],
        toSpendThree: formatAmountString(getToSpend(income, categories[2]["Percent"])),
        spentThree: formatAmountString(spent[2]["SUM(Amount)"]),
        remainingThree: formatAmountString(calculateRemaining(getToSpend(income, categories[2]["Percent"]), spent[2]["SUM(Amount)"])),
        percentSpentThree: percentSpent(getToSpend(income, categories[2]["Percent"]), spent[2]["SUM(Amount)"]),
        percentThree: categories[2]["Percent"],
    }});
};
}

const updateCategoriesIncome = () => {
  return async (income, newAliasOne, newPercentOne, newAliasTwo, newPercentTwo, newAliasThree, newPercentThree ) => {
    await database.updateIncome(income);
    await database.updateCategories(newAliasOne, newPercentOne, newAliasTwo, newPercentTwo, newAliasThree, newPercentThree)
  };
};

export const { Context, Provider } = createDataContext(
  CategoryIncomeReducer,
    { getCategoriesIncome, updateCategoriesIncome },
  []
);

