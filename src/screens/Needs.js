import React, {useContext} from "react";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {getCurrentMonth} from "../utilities/helper"
import { TabActions, useNavigation} from '@react-navigation/native';
import NeedWantGoalPages from "../components/NeedWantGoalPages";

const Needs = () => {
    const transactions = useContext(TransactionContext)
    const categoryIncome = useContext(CategoryIncomeContext)
    const navigation = useNavigation();
    const currentMonth = getCurrentMonth();
    const needs = transactions.state.filter(transaction => transaction["CategoryValue"] === "one" && transaction["Date"].substring(0,7) === currentMonth);

    return (
        <NeedWantGoalPages
            data={needs.sort((a, b) => b["Date"].localeCompare(a["Date"]))}
            header={() => <NeedWantGoalHeader 
                remaining={categoryIncome.state.remainingOne}
                spent={categoryIncome.state.spentOne}
                total={categoryIncome.state.toSpendOne}
                percent={categoryIncome.state.percentSpentOne}
                barColor="#9ce0ff"
                onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}
            />
            }
        />  
    )
}

export default Needs;