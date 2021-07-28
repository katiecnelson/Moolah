import React, {useContext, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import NeedWantGoalFooter from "../components/NeedWantGoalFooter";
import TransactionListDetail from "../components/TransactionListDetail";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {formatFullDate, formatAmountString, getCurrentMonth} from "../utilities/helper"
import { TabActions, useNavigation} from '@react-navigation/native';

const Needs = () => {
    const transactions = useContext(TransactionContext)
    const categoryIncome = useContext(CategoryIncomeContext)
    const navigation = useNavigation();
    const currentMonth = getCurrentMonth();
    const needs = transactions.state.filter(transaction => transaction["CategoryValue"] === "one" && transaction["Date"].substring(0,7) === currentMonth);

    return (
        <View style={styles.container}>
            <View style={{width: "94%", height: "100%"}} >
                <FlatList
                    data={needs.sort((a, b) => b["Date"].localeCompare(a["Date"]))}
                    ListHeaderComponent={() => <NeedWantGoalHeader 
                        // title={categoryIncome.state.nameOne}
                        remaining={categoryIncome.state.remainingOne}
                        spent={categoryIncome.state.spentOne}
                        total={categoryIncome.state.toSpendOne}
                        percent={categoryIncome.state.percentSpentOne}
                        barColor="#9ce0ff"
                        onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}
                    />
                    }
                    ListFooterComponent={() => <NeedWantGoalFooter 
                        onPress={() => navigation.navigate("History")}
                    />
                    }
                    keyExtractor={(item, index) => item.ID.toString()}

                    renderItem={({ item, index })=>(
                        <View style={{backgroundColor: index % 2 === 0 ? "#efefef" : "white", borderRadius: 5}}>
                        <TransactionListDetail
                            key={item["ID"]}
                            date={formatFullDate(item["Date"])}
                            description={item["Description"] === null ? "No description" : item["Description"]}
                            amount={formatAmountString(item["Amount"])}
                            category={item["CategoryLabel"]}
                            tag={item["Tag"]}
                        />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flex: 1,
    },
})

export default Needs;