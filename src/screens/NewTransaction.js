import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import TransactionForm from "../components/TransactionForm";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {TabActions, useNavigation} from "@react-navigation/native";

const NewTransaction = () => {

    const transactions = useContext(TransactionContext);
    const categoryIncome = useContext(CategoryIncomeContext);
    const navigation = useNavigation();

    const handleOnSubmit = (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
        navigation.dispatch(TabActions.jumpTo("Dash"));
        transactions.addTransaction(amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue);
        categoryIncome.categoriesAddTransaction(categoryValue, amount);
    };

    return (
        <View style={styles.container}>
            <TransactionForm
                onSubmit={handleOnSubmit}
                showDelete={false}
                showIncome
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
});

export default NewTransaction;