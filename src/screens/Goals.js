import React, {useContext} from "react";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {formatAmountString, filterSortTabs} from "../utilities/helper"
import {TabActions, useNavigation} from "@react-navigation/native";
import NeedWantGoalPages from "../components/NeedWantGoalPages";

const Goals = () => {
    const transactions = useContext(TransactionContext);
    const categoryIncome = useContext(CategoryIncomeContext);
    const navigation = useNavigation();

    return (
        <NeedWantGoalPages 
            data={filterSortTabs(transactions.state, "three")}
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
    );
};

export default Goals;