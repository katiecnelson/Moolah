import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import DashBarDetail from "./DashBarDetail";
import NeedWantGoalDetail from "../components/NeedWantGoalDetail"
import { Context as CategoryIncomeContext } from "../context/CategoryIncomeContext";
import { formatAmountString } from "../utilities/helper";
import NewTransactionButton from "./NewTransactionButton";
import { TabActions, useNavigation} from '@react-navigation/native';

const DashboardHeader = () => {
    const categoryIncome = useContext(CategoryIncomeContext)
    const navigation = useNavigation();

    useEffect(() => {
        console.log("Use effect from dashboard HEADER ran okay!")
        categoryIncome.getCategoriesIncome();
      }, []);

    return (
        
        <SafeAreaView style={{alignItems: "center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{alignItems: "center"}}>
                <Text style={styles.smallTitle}>INCOME:</Text>
                <Text style={styles.income}>{formatAmountString(categoryIncome.state.income)}</Text>
                <Icon name="edit" style={{fontSize: 28, color: "#48cae4"}} />
            </TouchableOpacity>
            <View style={styles.needWantGoalIcons}>
                <TouchableOpacity onPress={() => navigation.dispatch(TabActions.jumpTo("Needs"))}>
                    <NeedWantGoalDetail
                        title={categoryIncome.state.labelOne}
                        iconName="needs"
                        color="#9ce0ff"
                        amount={formatAmountString(categoryIncome.state.toSpendOne)}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.dispatch(TabActions.jumpTo("Wants"))}>
                    <NeedWantGoalDetail
                        title={categoryIncome.state.labelTwo}
                        iconName="wants"
                        color="#1489cc"
                        amount={formatAmountString(categoryIncome.state.toSpendTwo)}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.dispatch(TabActions.jumpTo("Goals"))}>
                    <NeedWantGoalDetail
                        title={categoryIncome.state.labelThree}
                        iconName="goals"
                        color="#024f86"
                        amount={formatAmountString(categoryIncome.state.toSpendThree)}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{width: "98%"}} onPress={() => navigation.dispatch(TabActions.jumpTo("Needs"))}>
                    <DashBarDetail
                        label={categoryIncome.state.labelOne + " REMAINING: "}
                        amountRemaining={formatAmountString(categoryIncome.state.remainingOne)}
                        amountSpent={formatAmountString(categoryIncome.state.spentOne)}
                        color="#9ce0ff"
                        percentSpent={categoryIncome.state.percentSpentOne}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={{width: "98%"}} onPress={() => navigation.dispatch(TabActions.jumpTo("Wants"))}>
                    <DashBarDetail
                        label={categoryIncome.state.labelTwo + " REMAINING: "}
                        amountRemaining={formatAmountString(categoryIncome.state.remainingTwo)}
                        amountSpent={formatAmountString(categoryIncome.state.spentTwo)}
                        color="#1489cc"
                        percentSpent={categoryIncome.state.percentSpentTwo}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={{width: "98%"}} onPress={() => navigation.dispatch(TabActions.jumpTo("Goals"))}>

                    <DashBarDetail
                        label={categoryIncome.state.labelThree + " REMAINING: "}
                        amountRemaining={formatAmountString(categoryIncome.state.remainingThree)}
                        amountSpent={formatAmountString(categoryIncome.state.spentThree)}
                        color="#024f86"
                        percentSpent={categoryIncome.state.percentSpentThree}
                    />
            </TouchableOpacity>
            <View style={{width: "100%", alignItems: "flex-end"}}>
                <TouchableOpacity onPress={() => navigation.navigate("History")} style={{marginTop: 20, marginBottom: 4, alignItems: "flex-end"}}>
                    <Icon name="history" style={{padding: 3, fontSize: 28, color: "#03045e"}}/>
                </TouchableOpacity>
            </View>
            <View style={{borderBottomColor: "#48cae4", borderBottomWidth: 1, marginBottom: 10}}>
                <Text style={styles.title}>TRANSACTIONS</Text>
            </View>
            <View style={{width: "100%"}}>
                <NewTransactionButton onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}/>
            </View>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff"
    },

    title: {
        fontFamily: "Nunito-Regular",
        fontSize: 24,
        color: "#03045e"
    },

    smallTitle: {
        fontFamily: "Nunito-Bold",
        paddingTop: 15,
        fontSize: 14,
        color: "#03045e"
    },
    income: {
        fontFamily: "Nunito-Bold",
        fontSize: 24,
        color: "#03045e"
    },
    needWantGoalIcons: {
        paddingTop: 15,
        paddingBottom: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },

})

export default DashboardHeader;