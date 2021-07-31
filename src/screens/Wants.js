import React, {useContext} from "react";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {getCurrentMonth, formatAmountString} from "../utilities/helper"
import { TabActions, useNavigation} from '@react-navigation/native';
import NeedWantGoalPages from "../components/NeedWantGoalPages";

const Wants = () => {
    const transactions = useContext(TransactionContext)
    const categoryIncome = useContext(CategoryIncomeContext)
    const navigation = useNavigation();
    const currentMonth = getCurrentMonth();
    const wants = transactions.state.filter(transaction => transaction["CategoryValue"] === "two" && transaction["Date"].substring(0,7) === currentMonth);

    return (
        <NeedWantGoalPages 
            data={wants.sort((a, b) => b["Date"].localeCompare(a["Date"]))}
            header={() => <NeedWantGoalHeader 
                remaining={formatAmountString(categoryIncome.state.remainingTwo)}
                spent={formatAmountString(categoryIncome.state.spentTwo)}
                total={formatAmountString(categoryIncome.state.toSpendTwo)}
                percent={categoryIncome.state.percentSpentTwo}
                barColor="#024f86"
                onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}
                />
            }
        />
    )
}

export default Wants;