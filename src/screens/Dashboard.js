import React, {useContext, useEffect} from "react";
import {View, StyleSheet, FlatList, SafeAreaView} from "react-native";
import TransactionListDetail from "../components/TransactionListDetail";
import DashboardHeader from "../components/DashboardHeader";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as TagContext} from "../context/TagContext";
import {formatAmountString, formatFullDate, filterSortDash} from "../utilities/helper";

/*
 * Returns JSX for the FlatList on the dashboard and uses a header and footer to make
 * up the rest of the Dashboard screen
 */

const Dashboard = ({navigation}) => {

    const {state, getTransactions} = useContext(TransactionContext);
    const tag = useContext(TagContext);

    // Loads the transactions and tags data into global state
    useEffect(() => {
        getTransactions();
        tag.getTags();
      }, []);

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.innerContainer}>
                <FlatList
                    data={filterSortDash(state)}
                    ListHeaderComponent={DashboardHeader}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({item, index}) => (
                        <View style={{...styles.itemView, backgroundColor: index % 2 === 0 ? "#efefef" : "white"}}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    innerContainer: {
        backgroundColor: "white",
        width: "94%"
    },
    itemView: {
        borderRadius: 5
    }
});

export default Dashboard;