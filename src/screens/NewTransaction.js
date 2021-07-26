import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "../components/Icon";
import TransactionForm from "../components/TransactionForm";
import {Context as TransactionContext} from "../context/TransactionContext";

const NewTransaction = ({navigation}) => {

    const transactions = useContext(TransactionContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editIncomeOpacity} onPress={() => navigation.navigate("Settings")}>
                <Icon name="edit" style={styles.icon}/>
                <Text style={styles.text}>EDIT INCOME</Text>
            </TouchableOpacity>
            <TransactionForm
                onSubmit={(amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
                    transactions.addTransaction(amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue, () => console.log("SUCCESS FOR ADD TRANSACTION!"));
                  }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    editIncomeOpacity: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 15,
        paddingTop: 20
    },
    text: {
        color: "#48cae4",
        lineHeight: 32
    },
    icon: {
        fontSize: 32,
        color: "#48cae4",
        paddingRight: 10
    },
})

export default NewTransaction;