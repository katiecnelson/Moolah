import React, {useContext, useState} from "react";
import {StyleSheet, View} from "react-native";
import TransactionForm from "../components/TransactionForm";
import TwoButtonToast from "../components/TwoButtonToast";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {useNavigation, StackActions} from "@react-navigation/native";
import {getCurrentMonth} from "../utilities/helper";

const EditTransaction = ({route}) => {

    const navigation = useNavigation();
    
    const transactions = useContext(TransactionContext);
    const transaction = transactions.state.find(transaction => transaction["ID"] === route.params.ID);

    const currentMonth = getCurrentMonth();

    const categoryIncome = useContext(CategoryIncomeContext);
    const originalCategory = transaction !== undefined ? transaction["CategoryValue"] : "zero";
    const originalAmount = transaction !== undefined ? transaction["Amount"] : 0;
    const originalDate = transaction !== undefined ? transaction["Date"] : "";

    const [showToast, setShowToast] = useState(false)

    const handleOnDelete = () => {
        navigation.dispatch(StackActions.pop(1));
        transactions.deleteTransaction(transaction["ID"]);
        if(originalDate.substring(0, 7) === currentMonth) {
            categoryIncome.categoriesDeleteTransaction(originalCategory, originalAmount);
        }
    };

    const handleOnSubmit = (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
        navigation.dispatch(StackActions.pop(1));
        transactions.editTransaction(
            transaction["ID"], amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue,
            () => {
                categoryIncome.getCategoriesIncome();
                transactions.getTransactions();
        });
    };

    return (
        transaction !== undefined
        ? <View style={styles.container}>
            <TwoButtonToast
                show={showToast}
                onRequestClose={() => setShowToast(false)}
                cancel={() => setShowToast(false)}
                delete={handleOnDelete}
                text="Permanently delete this transaction?"
            />
            <TransactionForm 
                onSubmit={handleOnSubmit}
                onPress={() => setShowToast(true)}
                showDelete
                showIncome={false}
                initialValues= {{
                    amount: transaction["Amount"],
                    date: transaction["Date"],
                    categoryValue: transaction["CategoryValue"],
                    categoryLabel: transaction["CategoryLabel"],
                    description: transaction["Description"],
                    tag: transaction["Tag"],
                    tagID: transaction["TagID"],
                }}
            />
        </View> : null
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
});

export default EditTransaction;