import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import TransactionListDetail from "../components/TransactionListDetail";
import NeedWantGoalIcons from "../components/NeedWantGoalIcons";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = (props) => {

    const [transactions, setTransactions] = useState([
        { key: "1", date: "12/06/21", description: "RBS Savings", amount: "£63.25", category: "GOAL", tag: "Italy savings" },
        { key: "2", date: "12/06/21", description: "Scottish Power", amount: "£63.25", category: "NEED", tag: "Utilities" },
        { key: "3", date: "11/06/21", description: "Uber Eats", amount: "£63.25", category: "WANT", tag: "Takeaway" },
        { key: "4", date: "10/06/21", description: "Glasgow City", amount: "£65.75", category: "NEED", tag: "Utilities" },
        { key: "5", date: "07/06/21", description: "No description", amount: "£15.75", category: "WANT", tag: "Takeaway" },
        { key: "6", date: "06/06/21", description: "John Lewis", amount: "£58.25", category: "WANT", tag: "Shopping" },
        { key: "7", date: "04/06/21", description: "Tesco", amount: "£21.50", category: "NEED", tag: "Food" },
        { key: "8", date: "03/06/21", description: "Vanguard", amount: "£65.75", category: "GOAL", tag: "Retirement" },
        { key: "9", date: "02/06/21", description: "Sainsbury’s", amount: "£12.00", category: "NEED", tag: "Food" },
        { key: "10", date: "01/06/21", description: "Gym", amount: "£45.00", category: "WANT", tag: "Hobbies" },
    ]);

    return (
        <SafeAreaView style={{backgroundColor: "white", flex: 1, alignItems: "center"}} >
            <View style={{backgroundColor: "white", width: "94%"}}>
                <FlatList
                    data={transactions}
                    ListHeaderComponent={DashboardHeader}
                    keyExtrator={( item, index ) => item.key}
                    renderItem={({ item, index }) => {
                        if (index % 2 === 0) {
                            return (
                            <View style={{backgroundColor: "#efefef", borderRadius: 5}}>
                                <TransactionListDetail
                                    date={item.date}
                                    description={item.description}
                                    amount={item.amount}
                                    category={item.category}
                                    tag={item.tag}
                                />
                            </View>
                            );
                        } else {
                            return (
                            <View style={{borderRadius: 5}}>
                                <TransactionListDetail
                                    date={item.date}
                                    description={item.description}
                                    amount={item.amount}
                                    category={item.category}
                                    tag={item.tag}
                                />
                            </View>
                            )
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: "center",
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

export default Dashboard;