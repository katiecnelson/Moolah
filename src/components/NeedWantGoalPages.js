import React from "react";
import {View, StyleSheet, FlatList} from "react-native";
import NeedWantGoalFooter from "../components/NeedWantGoalFooter";
import TransactionListDetail from "../components/TransactionListDetail";
import {formatFullDate, formatAmountString} from "../utilities/helper"
import {useNavigation} from "@react-navigation/native";

const NeedWantGoalPages = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer} >
                <FlatList
                    data={props.data}
                    ListHeaderComponent={props.header}
                    ListFooterComponent={() => <NeedWantGoalFooter 
                        onPress={() => navigation.navigate("History")} />
                    }
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({item, index})=>(
                        <View style={{...styles.listCard, backgroundColor: index % 2 === 0 ? "#efefef" : "white"}}>
                            <TransactionListDetail
                                key={item["ID"]}
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
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flex: 1,
    },
    innerContainer: {
        width: "94%",
        flex: 1
    },
    listCard: {
        borderRadius: 5
    }
});

export default NeedWantGoalPages;