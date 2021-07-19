import React, {useContext, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import NeedWantGoalFooter from "../components/NeedWantGoalFooter";
import TransactionListDetail from "../components/TransactionListDetail";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryContext} from "../context//CategoryContext";
import {formatFullDate, formatAmountString} from "../utilities/helper"
import { TabActions, useNavigation} from '@react-navigation/native';

const Wants = () => {
    const transactions = useContext(TransactionContext)
    const category = useContext(CategoryContext)
    const navigation = useNavigation();
    const needs = transactions.state.filter(transaction => transaction["Category"] === "WANTS");

    useEffect(() => {
        console.log("Use effect from WANTS ran okay!")
        transactions.getTransactions();
        category.getCategories();
        
      }, []);

      return (
        <View style={styles.container}>
            <View style={{width: "94%", height: "100%"}} >
                <FlatList
                    data={needs}
                    ListHeaderComponent={() => <NeedWantGoalHeader 
                        title={category.state.nameTwo}
                        remaining={category.state.remainingTwo}
                        spent={category.state.spentTwo}
                        total={category.state.toSpendTwo}
                        percent={category.state.percentSpentTwo}
                        barColor="#1489cc"
                        onPress={() => navigation.dispatch(TabActions.jumpTo("New"))}
                    />
                    }
                    ListFooterComponent={() => <NeedWantGoalFooter 
                        onPress={() => navigation.navigate("History")}
                    />
                    }
                    keyExtractor={(item, index) => item.ID.toString()}

                    renderItem={({ item, index })=>(
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flex: 1,
    },
});

export default Wants;