import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import TransactionListDetail from "../components/TransactionListDetail";
import DashboardHeader from "../components/DashboardHeader";
import { Context as TransactionContext } from "../context/TransactionContext";
import { formatAmountString, formatFullDate } from "../utilities/helper";

const Dashboard = (props) => {
    const { state, getTransactions } = useContext(TransactionContext)

    useEffect(() => {
        getTransactions();
      }, []);

    return (
        <SafeAreaView style={{backgroundColor: "white", flex: 1, alignItems: "center"}} >
            <View style={{backgroundColor: "white", width: "94%"}}>
                <FlatList
                    data={state}
                    ListHeaderComponent={DashboardHeader}
                    keyExtractor={(item, index) => item.ID.toString()}
                    renderItem={({ item, index }) => (
                            <View style={{backgroundColor: index % 2 === 0 ? "#efefef" : "white", borderRadius: 5}}>
                                <TransactionListDetail
                                    key={item["ID"]}
                                    date={formatFullDate(item["Date"])}
                                    description={item["Description"]}
                                    amount={formatAmountString(item["Amount"])}
                                    category={item["CategoryLabel"]}
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