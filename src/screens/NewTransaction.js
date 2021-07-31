import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "../components/Icon";
import TransactionForm from "../components/TransactionForm";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import { TabActions, useNavigation} from '@react-navigation/native';

const NewTransaction = () => {

    const transactions = useContext(TransactionContext);
    const categoryIncome = useContext(CategoryIncomeContext);
    const navigation = useNavigation();

    const handleOnSubmit = (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
        // navigation.dispatch(CommonActions.reset({
        //     index: 0,
        //     routes: [
        //       { name: 'Dash' },
        //     ],
        //   })
        // );
        navigation.dispatch(TabActions.jumpTo("Dash")); // <-- doing this will NOT totally refresh the categories on dash
        transactions.addTransaction(amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue, () => console.log("SUCCESS FOR ADD TRANSACTION!"));
        categoryIncome.categoriesAddTransaction(categoryValue, amount);

    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editIncomeOpacity} onPress={() => navigation.navigate("Settings")}>
                <Icon name="edit" style={styles.icon}/>
                <Text style={styles.text}>EDIT INCOME</Text>
            </TouchableOpacity>
            <TransactionForm
                onSubmit={handleOnSubmit}
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