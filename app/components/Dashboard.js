import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import Icon from "../components/Icon";
import NeedWantGoalDetail from "./NeedWantGoalDetail";
import DashBarDetail from "./DashBarDetail";
import TransactionListDetail from "./TransactionListDetail";
import NeedWantGoalIcons from "./NeedWantGoalIcons";

const Dashboard = () => {

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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{width: "100%", alignItems: "center"}}>
                <Icon name="bell" style={{fontSize: 28, color: "#b7b7b7", position: "absolute", left: 7, top: 25}} />
                <Icon name="gear" style={{fontSize: 28, color: "#b7b7b7", position: "absolute", right: 7, top: 25}} />
                <View style={{borderBottomColor: "#48cae4", borderBottomWidth: 1}}>
                    <Text style={{...styles.title, paddingTop: 25}}>DASHBOARD</Text>
                </View>
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
                <View style={{width: "94%", paddingBottom: 20}}>
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
                <View style={{width: "94%"}} >
                    <FlatList
                        data={transactions}
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
            </ScrollView>
        </View>
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
        paddingTop: 20,
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