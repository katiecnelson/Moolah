import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import TransactionListDetail from "../components/TransactionListDetail";
import DashboardHeader from "../components/DashboardHeader";
import { Context as TransactionContext } from "../context/TransactionContext";
import { Context as IncomeContext } from "../context/IncomeContext";
import { formatAmountString, formatFullDate } from "../utilities/helper";

const Dashboard = (props) => {

    const { state, getTransactions } = useContext(TransactionContext)

    useEffect(() => {
        console.log("Use effect dashboard ran okay!")
        getTransactions();
      }, []);

    return (
        <SafeAreaView style={{backgroundColor: "white", flex: 1, alignItems: "center"}} >
            <View style={{backgroundColor: "white", width: "94%"}}>
                <FlatList
                    data={state}
                    ListHeaderComponent={DashboardHeader}
                    keyExtractor={(item, index) => item.ID}
                    renderItem={({ item, index }) => (
                            <View style={{backgroundColor: index % 2 === 0 ? "#efefef" : "white", borderRadius: 5}}>
                                <TransactionListDetail
                                    key={item["ID"]}
                                    date={formatFullDate(item["Date"])}
                                    description={item["Description"]}
                                    amount={formatAmountString(item["Amount"])}
                                    category={item["Category"]}
                                    tag={item["Tag"]}
                                />
                            </View>
                    )}
                />
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

export default Dashboard;

    // const [transactions, setTransactions] = useState([
    //     { key: "1", date: "12/06/21", description: "RBS Savings", amount: "£63.25", category: "GOAL", tag: "Italy savings" },
    //     { key: "2", date: "12/06/21", description: "Scottish Power", amount: "£63.25", category: "NEED", tag: "Utilities" },
    //     { key: "3", date: "11/06/21", description: "Uber Eats", amount: "£63.25", category: "WANT", tag: "Takeaway" },
    //     { key: "4", date: "10/06/21", description: "Glasgow City", amount: "£65.75", category: "NEED", tag: "Utilities" },
    //     { key: "5", date: "07/06/21", description: "No description", amount: "£15.75", category: "WANT", tag: "Takeaway" },
    //     { key: "6", date: "06/06/21", description: "John Lewis", amount: "£58.25", category: "WANT", tag: "Shopping" },
    //     { key: "7", date: "04/06/21", description: "Tesco", amount: "£21.50", category: "NEED", tag: "Food" },
    //     { key: "8", date: "03/06/21", description: "Vanguard", amount: "£65.75", category: "GOAL", tag: "Retirement" },
    //     { key: "9", date: "02/06/21", description: "Sainsbury’s", amount: "£12.00", category: "NEED", tag: "Food" },
    //     { key: "10", date: "01/06/21", description: "Gym", amount: "£45.00", category: "WANT", tag: "Hobbies" },
    // ]);