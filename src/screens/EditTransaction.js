import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "../components/Icon";
import TransactionForm from "../components/TransactionForm";
import {Context as TransactionContext} from "../context/TransactionContext";
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';

const EditTransaction = ({route}) => {

    const transactions = useContext(TransactionContext);

    const transaction = transactions.state.find(transaction => transaction["ID"] === route.params.ID)

    const navigation = useNavigation();

    // console.log(transaction)

    const handleOnPress = () => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Dashboard' },
            ],
          })
        );
        // navigation.dispatch(StackActions.pop(1)) <-- doing this will NOT totally refresh the categories on dash
        transactions.deleteTransaction(transaction["ID"])
        transactions.getTransactions(); 
        
    }

    return (
        transaction !== undefined ? <View behavior={"padding"} style={styles.container}>
            <View style={{marginTop: 40}}></View>
            <TransactionForm 
                onSubmit={(amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue) => {
                    transactions.editTransaction(transaction["ID"], amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue, () => console.log("SUCCESS FOR EDIT TRANSACTION!"));
                  }}
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