import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {Context as TransactionContext} from "../context/TransactionContext";
import { getCurrentMonth, formatFullDate, formatAmountString } from "../utilities/helper";
import TransactionListDetail from "../components/TransactionListDetail";

const History = ({navigation}) => {

    const currentMonth = getCurrentMonth();
    const transaction = useContext(TransactionContext);

    return (
        <View style={{backgroundColor: "white", flex: 1, alignItems: "center"}}>
            <View style={styles.container}>
                <FlatList
                        data={transaction.state.filter(transaction => transaction["Date"].substring(0,7) !== currentMonth).sort((a, b) => b["Date"].localeCompare(a["Date"]))}
                        ListHeaderComponent={<View style={{height: 25}}/>}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "94%",
        backgroundColor: "#ffffff",
        flex: 1,
    },
});

export default History;