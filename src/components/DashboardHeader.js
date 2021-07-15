import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import DashBarDetail from "./DashBarDetail";
import NeedWantGoalDetail from "../components/NeedWantGoalDetail"
import { Context as IncomeContext } from "../context/IncomeContext";
import { Context as CategoryContext } from "../context/CategoryContext";
import { formatAmountString } from "../utilities/helper";

const DashboardHeader = () => {
    const category = useContext(CategoryContext)
    const income = useContext(IncomeContext)

    useEffect(() => {
        console.log("Use effect from dashboard HEADER ran okay!")
        income.getIncome();
        category.getCategories();
      }, []);

    return (
        
        <SafeAreaView style={{alignItems: "center"}}>
            <Text style={styles.smallTitle}>INCOME:</Text>
            <Text style={styles.income}>{formatAmountString(income.state.amount)}</Text>
            <Icon name="edit" style={{fontSize: 28, color: "#48cae4"}} />
            <View style={styles.needWantGoalIcons}>
                <NeedWantGoalDetail
                    title={category.state.nameOne}
                    iconName="needs"
                    color="#9ce0ff"
                    amount={category.state.toSpendOne}
                />
                <NeedWantGoalDetail
                    title={category.state.nameTwo}
                    iconName="wants"
                    color="#1489cc"
                    amount={category.state.toSpendTwo}
                />
                <NeedWantGoalDetail
                    title={category.state.nameThree}
                    iconName="goals"
                    color="#024f86"
                    amount={category.state.toSpendThree}
                /> 
            </View>
            <View style={{width: "94%"}}>
                <DashBarDetail
                    label={category.state.nameOne + " REMAINING: "}
                    amountRemaining={category.state.remainingOne}
                    amountSpent={category.state.spentOne}
                    color="#9ce0ff"
                    percentSpent={category.state.percentSpentOne}
                />
            </View>
            <View style={{width: "94%"}}>
                <DashBarDetail
                    label={category.state.nameTwo + " REMAINING: "}
                    amountRemaining={category.state.remainingTwo}
                    amountSpent={category.state.spentTwo}
                    color="#1489cc"
                    percentSpent={category.state.percentSpentTwo}
                />
            </View>
            <View style={{width: "94%", paddingBottom: 15}}>
                <DashBarDetail
                    label={category.state.nameThree + " REMAINING: "}
                    amountRemaining={category.state.remainingThree}
                    amountSpent={category.state.spentThree}
                    color="#024f86"
                    percentSpent={category.state.percentSpentThree}
                />
            </View>
            <View style={{paddingTop: 30, alignSelf: "stretch"}}>
                <Icon name="history" style={{fontSize: 28, color: "#03045e", position: "absolute", right: 7}}/>
            </View>
            <View style={{borderBottomColor: "#48cae4", borderBottomWidth: 1, marginBottom: 10}}>
                <Text style={styles.title}>TRANSACTIONS</Text>
            </View>
            <View style={{flexDirection: "row", paddingVertical: 10, width: "100%"}}>
                <Icon name="new" style={{fontSize: 28, color: "#48cae4", paddingHorizontal: 7}}/>
                <Text style={{color: "#48cae4", lineHeight: 28, fontFamily: "Nunito-Bold"}}>NEW TRANSACTION</Text>
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