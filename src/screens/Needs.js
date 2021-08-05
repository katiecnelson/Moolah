import React, {useContext} from "react";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {formatAmountString, filterSortTabs} from "../utilities/helper"
import {TabActions, useNavigation} from "@react-navigation/native";
import NeedWantGoalPages from "../components/NeedWantGoalPages";

const Needs = () => {
    const transactions = useContext(TransactionContext);
    const categoryIncome = useContext(CategoryIncomeContext);
    const navigation = useNavigation();

    return (
        <NeedWantGoalPages
            data={filterSortTabs(transactions.state, "one")}
            header={() => <NeedWantGoalHeader 
                remaining={formatAmountString(categoryIncome.state.remainingOne)}
                spent={formatAmountString(categoryIncome.state.spentOne)}
                total={formatAmountString(categoryIncome.state.toSpendOne)}
                percent={categoryIncome.state.percentSpentOne}
                barColor="#9ce0ff"
                onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}
                />
            }
        />  
    );
};

export default Needs;