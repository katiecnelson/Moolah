import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import TransactionForm from "../components/TransactionForm";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {useNavigation} from "@react-navigation/native";
import {getCurrentMonth} from "../utilities/helper";

/*
 * Formats the TransactionForm for new transactions and 
 * handles the button for the NewTransaction screen
 */

const NewTransaction = () => {

    const currentMonth = getCurrentMonth();

    const transactions = useContext(TransactionContext);
    const categoryIncome = useContext(CategoryIncomeContext);
    const navigation = useNavigation();

    // Adds the transaction into the global store
    const handleOnSubmit = (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
        transactions.addTransaction(amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue);
        
        if(date.substring(0, 7) === currentMonth) {
            categoryIncome.categoriesAddTransaction(categoryValue, amount);
            navigation.navigate("Dash", {screen: "Dashboard"});
        } else {
            navigation.navigate("Dash", {screen: "History"});
        }
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