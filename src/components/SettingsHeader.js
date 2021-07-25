import React, {useContext, useState} from "react";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import Icon from "../components/Icon";
import CustomButton from "../components/CustomButton";
import GlobalStyle from "../components/GlobalStyle";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {Context as TransactionContext} from "../context/TransactionContext";
import CurrencyInput from 'react-native-currency-input';
import {formatAmountNum, getToSpend} from "../utilities/helper";
import Toast from "../components/Toast";
import { StackActions, useNavigation } from '@react-navigation/native';
import {amountToDatabase} from "../utilities/helper"


const SettingsHeader = () => {
    const categoryIncome = useContext(CategoryIncomeContext);
    const transaction = useContext(TransactionContext);

    const [income, setIncome] = useState(formatAmountNum(categoryIncome.state.income))
    const [labelOne, setLabelOne] = useState(categoryIncome.state.labelOne)
    const [labelTwo, setLabelTwo] = useState(categoryIncome.state.labelTwo)
    const [labelThree, setLabelThree] = useState(categoryIncome.state.labelThree)
    const [percentOne, setpercentOne] = useState(categoryIncome.state.percentOne)
    const [percentTwo, setpercentTwo] = useState(categoryIncome.state.percentTwo)
    const [percentThree, setPercentThree] = useState(categoryIncome.state.percentThree)
    const [showToast, setShowToast] = useState(false)

    const navigation = useNavigation();

    const handleSave = async () => {
        if (parseInt(percentOne) + parseInt(percentTwo) + parseInt(percentThree) !== 100
        || income === 0 || labelOne === "" || labelTwo === "" || labelThree === "") {
            setShowToast(true);
        } else {
            await categoryIncome.updateCategoriesIncome(amountToDatabase(income), labelOne.toUpperCase(), parseInt(percentOne), labelTwo.toUpperCase(), parseInt(percentTwo), labelThree.toUpperCase(), parseInt(percentThree))
            await categoryIncome.getCategoriesIncome();
            await transaction.getTransactions();
            navigation.dispatch(StackActions.pop(1));
        }
    }

    console.log(typeof percentThree)

    return (
        <View>
            <Toast
                show={showToast}
                onRequestClose={() => setShowToast(false)} 
                onPress={() => setShowToast(false)}
                text="Please fill out income, category names, and ensure that percentage numbers total 100."
            />
            <View style={{flexDirection: "row", width: "100%", justifyContent: "center", marginVertical: 20}}>
                <Text style={{...styles.text, lineHeight: 55, paddingRight: 10}}>INCOME:</Text>
                <CurrencyInput
                    value={income}
                    onChangeValue={setIncome}
                    unit="£"
                    delimiter=","
                    separator="."
                    precision={2}
                    text={income} 
                    textAlign={"center"}
                    keyboardType={"number-pad"}
                    style={{padding: 10, backgroundColor: "#efefef", borderRadius: 10, fontSize: 28, color: "#03045e"}}
                />
            </View>
            <View style={{alignItems: "center"}}>
                <View style={{flexDirection: "row", justifyContent: "space-around", paddingTop: 10}}>
                    <TextInput
                        value={labelOne.toUpperCase()}
                        onChangeText={setLabelOne}
                        textAlign={"center"}
                        maxLength={8}
                        style={{fontFamily: "Nunito-Bold", flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: "#efefef", borderRadius: 10, color: "#03045e"}}
                    />
                    <TextInput
                        value={labelTwo.toUpperCase()}
                        onChangeText={setLabelTwo}
                        textAlign={"center"}
                        maxLength={8}
                        style={{fontFamily: "Nunito-Bold", flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: "#efefef", borderRadius: 10, color: "#03045e"}}
                    />
                    <TextInput
                        value={labelThree.toUpperCase()}
                        onChangeText={setLabelThree}
                        textAlign={"center"}
                        maxLength={8}
                        style={{fontFamily: "Nunito-Bold", flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: "#efefef", borderRadius: 10, color: "#03045e"}}
                    />
                </View>
                <View style={{flexDirection: "row", alignContent: "center", paddingTop: 15}}>
                    <Icon name="needs" style={{flex: 1, color: "#9ce0ff", fontSize: 42, textAlign: "center"}}/>
                    <Icon name="wants" style={{flex: 1, color: "#1489cc", fontSize: 42, textAlign: "center"}}/>
                    <Icon name="goals" style={{flex: 1, color: "#024f86", fontSize: 42, textAlign: "center"}}/>
                </View>
                <View style={{flexDirection: "row", alignContent: "center", paddingTop: 15, marginBottom: 30}}>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TextInput
                            value={percentOne.toString()}
                            onChangeText={setpercentOne}
                            textAlign={"center"}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            style={{fontFamily: "Nunito-Bold", marginHorizontal: 5, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: "#efefef", borderRadius: 10, fontSize: 16, color: "#03045e"}}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TextInput
                            value={percentTwo.toString()}
                            onChangeText={setpercentTwo}
                            textAlign={"center"}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            style={{fontFamily: "Nunito-Bold", marginHorizontal: 5, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: "#efefef", borderRadius: 10, fontSize: 16, color: "#03045e"}}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TextInput
                            value={percentThree.toString()}
                            onChangeText={setPercentThree}
                            textAlign={"center"}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            style={{fontFamily: "Nunito-Bold", marginHorizontal: 5, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: "#efefef", borderRadius: 10, fontSize: 16, color: "#03045e"}}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                </View>
                <CustomButton text="save" onPress={handleSave}/>
                <View style={{borderBottomColor: "#48cae4", borderBottomWidth: 1, marginBottom: 25}}>
                    <Text style={styles.title}>TAGS</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e"
    },
    amountText: {
        flex: 1,
        fontSize: 18,
        textAlign: "center"
    },
    percent: {
        fontSize: 15,
        lineHeight: 42
    },
    title: {
        fontFamily: "Nunito-Regular",
        fontSize: 24,
        color: "#03045e",
        marginTop: 25,
    },
})

export default SettingsHeader;