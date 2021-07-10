import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import DashBarDetail from "./DashBarDetail";
import NeedWantGoalIcons from "./NeedWantGoalIcons";
import GlobalStyle from "./GlobalStyle";

const DashboardHeader = (props) => {

    return (
        <SafeAreaView style={{alignItems: "center"}}>
            <Text style={styles.smallTitle}>INCOME:</Text>
            <Text style={styles.income}>£1,300.00</Text>
            <Icon name="edit" style={{fontSize: 28, color: "#48cae4"}} />
            <NeedWantGoalIcons/>
            <View style={{width: "94%"}}>
                <DashBarDetail
                    label="NEEDS REMAINING: "
                    amountRemaining="£487.50"
                    amountSpent="£162.50"
                    color="#9ce0ff"
                    percentSpent="25%"
                />
            </View>
            <View style={{width: "94%"}}>
                <DashBarDetail
                    label="WANTS REMAINING: "
                    amountRemaining="£250.00"
                    amountSpent="£140.00"
                    color="#1489cc"
                    percentSpent="35.9%"
                />
            </View>
            <View style={{width: "94%", paddingBottom: 15}}>
                <DashBarDetail
                    label="GOALS REMAINING: "
                    amountRemaining="£165.00"
                    amountSpent="£95.00"
                    color="#024f86"
                    percentSpent="36.5%"
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

})

export default DashboardHeader;