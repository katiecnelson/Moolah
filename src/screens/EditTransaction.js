import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "../components/Icon";
import TransactionForm from "../components/TransactionForm";
import {Context as TransactionContext} from "../context/TransactionContext";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
import {getCurrentMonth} from "../utilities/helper";

const EditTransaction = ({route}) => {

    const transactions = useContext(TransactionContext);
    const categoryIncome = useContext(CategoryIncomeContext);

    const transaction = transactions.state.find(transaction => transaction["ID"] === route.params.ID)

    const navigation = useNavigation();

    const originalCategory = transaction !== undefined ? transaction["CategoryValue"] : "zero";
    const originalAmount = transaction !== undefined ? transaction["Amount"] : 0;
    const currentMonth = getCurrentMonth();



    const handleOnPress = () => {
        // navigation.dispatch(CommonActions.reset({
        //     index: 0,
        //     routes: [
        //       { name: 'Dashboard' },
        //     ],
        //   })
        // );
        navigation.dispatch(StackActions.pop(1)) // <-- doing this will NOT totally refresh the categories on dash
        transactions.deleteTransaction(transaction["ID"])
        categoryIncome.categoriesDeleteTransaction(originalCategory, originalAmount)

    }

    const handleOnSubmit = (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Dashboard' },
            ],
          })
        );
        // navigation.dispatch(StackActions.pop(1))
        transactions.editTransaction(transaction["ID"], amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue, () => console.log("SUCCESS FOR EDIT TRANSACTION!"));
        // if (date.substring(0,7) === currentMonth) {
        //     categoryIncome.categoriesEditTransaction(categoryValue, originalCategory, originalAmount, amount);
        // }
        
    }


    return (
        transaction !== undefined ? <View behavior={"padding"} style={styles.container}>
            <View style={{marginTop: 40}}></View>
            <TransactionForm 
                onSubmit={handleOnSubmit}
                initialValues= {{
                    amount: transaction["Amount"],
                    date: transaction["Date"],
                    categoryValue: transaction["CategoryValue"],
                    categoryLabel: transaction["CategoryLabel"],
                    description: transaction["Description"],
                    tag: transaction["Tag"],
                    tagID: transaction["TagID"]
                }}
            />
            <View style={styles.deleteView}>
                <TouchableOpacity onPress={handleOnPress}>
                    <Icon name="delete" style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View> : null
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    deleteView: {
        alignItems: "flex-end",
    },
    icon: {
        fontSize: 32,
        color: "#03045e",
        paddingRight: 10,
        paddingVertical: 7,
        paddingLeft: 5
    },
})

export default EditTransaction;