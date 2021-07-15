import createDataContext from "./createDataContext";
import { database } from "../db/database";
import { getToSpend, formatAmountString, calculateRemaining, percentSpent } from "../utilities/helper";


const CategoryReducer = (state, action) => {
  switch (action.type) {
    case 'get_categories':
      return action.payload;
    default:
      return state;
  }
};

// const getCategories = dispatch => {
//   return async () => {
//     const categories = await database.getAllCategories();
//     const incomeCall = await database.getIncome();
//     const income = await incomeCall[0]["Amount"];

//     console.log("get categories worked!")

//     dispatch({ type: 'get_categories', payload: { 
//         one: {
//             name: categories[0]["Name"].toUpperCase(),
//             amount: formatAmountString(getPercentage(income, categories[0]["Percent"]))
//         },
//         two: {
//             name: categories[1]["Name"].toUpperCase(),
//             amount: formatAmountString(getPercentage(income, categories[1]["Percent"]))
//         },
//         three: {
//             name: categories[2]["Name"].toUpperCase(),
//             amount: formatAmountString(getPercentage(income, categories[2]["Percent"]))
//         },
//     }});
//   };
// };

const getCategories = dispatch => {
  return async () => {
    const categories = await database.getAllCategories();
    const incomeCall = await database.getIncome();
    const spent = await database.getNeedSpent();
    const income = await incomeCall[0]["Amount"];

    console.log("get categories worked!")

    dispatch({ type: 'get_categories', payload: {
        nameOne: categories[0]["Name"].toUpperCase(), 
        toSpendOne: formatAmountString(getToSpend(income, categories[0]["Percent"])),
        spentOne: formatAmountString(spent[0]["SUM(Amount)"]),
        remainingOne: formatAmountString(calculateRemaining(getToSpend(income, categories[0]["Percent"]), spent[0]["SUM(Amount)"])),
        percentSpentOne: percentSpent(getToSpend(income, categories[0]["Percent"]), spent[0]["SUM(Amount)"]),

        nameTwo: categories[1]["Name"].toUpperCase(),
        toSpendTwo: formatAmountString(getToSpend(income, categories[1]["Percent"])),
        spentTwo: formatAmountString(spent[1]["SUM(Amount)"]),
        remainingTwo: formatAmountString(calculateRemaining(getToSpend(income, categories[1]["Percent"]), spent[1]["SUM(Amount)"])),
        percentSpentTwo: percentSpent(getToSpend(income, categories[1]["Percent"]), spent[1]["SUM(Amount)"]),

        nameThree: categories[2]["Name"].toUpperCase(),
        toSpendThree: formatAmountString(getToSpend(income, categories[2]["Percent"])),
        spentThree: formatAmountString(spent[2]["SUM(Amount)"]),
        remainingThree: formatAmountString(calculateRemaining(getToSpend(income, categories[2]["Percent"]), spent[2]["SUM(Amount)"])),
        percentSpentThree: percentSpent(getToSpend(income, categories[2]["Percent"]), spent[2]["SUM(Amount)"]),
    }});
};
}



export const { Context, Provider } = createDataContext(
    CategoryReducer,
    { getCategories },
  []
);