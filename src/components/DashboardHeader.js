import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import DashBarDetail from "./DashBarDetail";
import NeedWantGoalDetail from "../components/NeedWantGoalDetail"
import { Context as IncomeContext } from "../context/IncomeContext";
import { Context as CategoryContext } from "../context/CategoryContext";
import { formatAmountString } from "../utilities/helper";
import NewTransactionButton from "./NewTransactionButton";
import { TabActions, useNavigation} from '@react-navigation/native';

const DashboardHeader = () => {
    const category = useContext(CategoryContext)
    const income = useContext(IncomeContext)
    const navigation = useNavigation();

    useEffect(() => {
        console.log("Use effect from dashboard HEADER ran okay!")
        income.getIncome();
        category.getCategories();
      }, []);

    return (
        
        <SafeAreaView style={{alignItems: "center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{alignItems: "center"}}>
                <Text style={styles.smallTitle}>INCOME:</Text>
                <Text style={styles.income}>{formatAmountString(income.state.amount)}</Text>
                <Icon name="edit" style={{fontSize: 28, color: "#48cae4"}} />
            </TouchableOpacity>
            <View style={styles.needWantGoalIcons}>
                <TouchableOpacity onPress={() => navigation.dispatch(TabActions.jumpTo("Needs"))}>
                    <NeedWantGoalDetail
                        title={category.state.nameOne}
                        iconName="needs"
                        color="#9ce0ff"
                        amount={category.state.toSpendOne}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.dispatch(TabActions.jumpTo("Wants"))}>
                    <NeedWantGoalDetail
                        title={category.state.nameTwo}
                        iconName="wants"
                        color="#1489cc"
                        amount={category.state.toSpendTwo}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.dispatch(TabActions.jumpTo("Goals"))}>
                    <NeedWantGoalDetail
                        title={category.state.nameThree}
                        iconName="goals"
                        color="#024f86"
                        amount={category.state.toSpendThree}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{width: "98%"}} onPress={() => navigation.dispatch(TabActions.jumpTo("Needs"))}>
                    <DashBarDetail
                        label={category.state.nameOne + " REMAINING: "}
                        amountRemaining={category.state.remainingOne}
                        amountSpent={category.state.spentOne}
                        color="#9ce0ff"
                        percentSpent={category.state.percentSpentOne}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={{width: "98%"}} onPress={() => navigation.dispatch(TabActions.jumpTo("Wants"))}>
                    <DashBarDetail
                        label={category.state.nameTwo + " REMAINING: "}
                        amountRemaining={category.state.remainingTwo}
                        amountSpent={category.state.spentTwo}
                        color="#1489cc"
                        percentSpent={category.state.percentSpentTwo}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={{width: "98%"}} onPress={() => navigation.dispatch(TabActions.jumpTo("Goals"))}>

                    <DashBarDetail
                        label={category.state.nameThree + " REMAINING: "}
                        amountRemaining={category.state.remainingThree}
                        amountSpent={category.state.spentThree}
                        color="#024f86"
                        percentSpent={category.state.percentSpentThree}
                    />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("History")} style={{marginTop: 15, marginBottom:30, alignSelf: "stretch"}}>
                <View >
                    <Icon name="history" style={{fontSize: 28, color: "#03045e", position: "absolute", right: 7}}/>
                </View>
            </TouchableOpacity>
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