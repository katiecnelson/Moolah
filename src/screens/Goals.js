import React, {useContext, useEffect} from "react";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {getCurrentMonth, formatAmountString} from "../utilities/helper"
import { TabActions, useNavigation} from '@react-navigation/native';
import NeedWantGoalPages from "../components/NeedWantGoalPages";

const Goals = () => {
    const transactions = useContext(TransactionContext)
    const categoryIncome = useContext(CategoryIncomeContext)
    const navigation = useNavigation();
    const currentMonth = getCurrentMonth();
    const goals = transactions.state.filter(transaction => transaction["CategoryValue"] === "three" && transaction["Date"].substring(0,7) === currentMonth);

    //Below is for testing only!
    useEffect(() => {
        transactions.getTransactions();
      }, []);

    return (
        <NeedWantGoalPages 
            data={goals.sort((a, b) => b["Date"].localeCompare(a["Date"]))}
            header={() => <NeedWantGoalHeader 
                remaining={formatAmountString(categoryIncome.state.remainingThree)}
                spent={formatAmountString(categoryIncome.state.spentThree)}
                total={formatAmountString(categoryIncome.state.toSpendThree)}
                percent={categoryIncome.state.percentSpentThree}
                barColor="#024f86"
                onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}
                />
            }
        />
    )
}

export default Goals;