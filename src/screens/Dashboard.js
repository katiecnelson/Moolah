import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import TransactionListDetail from "../components/TransactionListDetail";
import DashboardHeader from "../components/DashboardHeader";
import { Context as TransactionContext } from "../context/TransactionContext";
import { Context as TagContext } from "../context/TagContext";
import { formatAmountString, formatFullDate, getCurrentMonth } from "../utilities/helper";

const Dashboard = ({navigation}) => {
    const { state, getTransactions } = useContext(TransactionContext);
    const tag = useContext(TagContext);
    const currentMonth = getCurrentMonth();

    useEffect(() => {
        getTransactions();
        tag.getTags();
      }, []);

      //TODO: Below is for testing only!
    //   console.log("THIS IS TRANSACTION STATE FROM DASH: " + JSON.stringify(state))

    return (
        <SafeAreaView style={{backgroundColor: "white", flex: 1, alignItems: "center"}} >
            <View style={{backgroundColor: "white", width: "94%"}}>
                <FlatList
                    data={state.filter(transaction => transaction["Date"].substring(0,7) === currentMonth).sort((a, b) => b["Date"].localeCompare(a["Date"]))}
                    ListHeaderComponent={DashboardHeader}
                    keyExtractor={(item, index) => item.ID.toString()}
                    renderItem={({ item, index }) => (
                            <View style={{backgroundColor: index % 2 === 0 ? "#efefef" : "white", borderRadius: 5}}>
                                <TransactionListDetail
                                    key={item["ID"]}
                                    ID={item["ID"]}
                                    date={formatFullDate(item["Date"])}
                                    description={item["Description"] === null ? "No description" : item["Description"]}
                                    amount={formatAmountString(item["Amount"])}
                                    category={item["CategoryLabel"]}
                                    tag={item["Tag"]}
                                    onPress={() => navigation.navigate("Edit Transaction", {ID: item["ID"]})}
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