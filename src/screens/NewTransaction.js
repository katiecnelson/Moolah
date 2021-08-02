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
            <TransactionForm
                onSubmit={handleOnSubmit}
                showDelete={false}
                showIncome
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    
    
})

export default NewTransaction;