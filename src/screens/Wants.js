import React, {useContext} from "react";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {formatAmountString, filterSortTabs} from "../utilities/helper"
import {TabActions, useNavigation} from "@react-navigation/native";
import NeedWantGoalPages from "../components/NeedWantGoalPages";

/*
 * Sends the wants data to NeedWantGoalPages component
 * Exists in the tab and stack navigator
 */

const Wants = () => {
    const transactions = useContext(TransactionContext)
    const categoryIncome = useContext(CategoryIncomeContext)
    const navigation = useNavigation();

    return (
        <NeedWantGoalPages 
            data={filterSortTabs(transactions.state, "two")}
            header={() => <NeedWantGoalHeader 
                remaining={formatAmountString(categoryIncome.state.remainingTwo)}
                spent={formatAmountString(categoryIncome.state.spentTwo)}
                total={formatAmountString(categoryIncome.state.toSpendTwo)}
                percent={categoryIncome.state.percentSpentTwo}
                barColor="#1489cc"
                onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}
                />
            }
        />
    );
};

export default Wants;