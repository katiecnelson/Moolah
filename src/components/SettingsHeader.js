import React, {useContext, useState} from "react";
import {View, StyleSheet, Text, TextInput} from "react-native";
import Icon from "../components/Icon";
import CustomButton from "../components/CustomButton";
import GlobalStyle from "../components/GlobalStyle";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {Context as TransactionContext} from "../context/TransactionContext";
import CurrencyInput from "react-native-currency-input";
import {formatAmountNum} from "../utilities/helper";
import Toast from "../components/Toast";
import {StackActions, useNavigation} from "@react-navigation/native";
import {amountToDatabase} from "../utilities/helper";
import AddTag from "./AddTag";


const SettingsHeader = () => {
    const categoryIncome = useContext(CategoryIncomeContext);
    const transaction = useContext(TransactionContext);

    const [income, setIncome] = useState(formatAmountNum(categoryIncome.state.income));
    const [labelOne, setLabelOne] = useState(categoryIncome.state.labelOne);
    const [labelTwo, setLabelTwo] = useState(categoryIncome.state.labelTwo);
    const [labelThree, setLabelThree] = useState(categoryIncome.state.labelThree);
    const [percentOne, setpercentOne] = useState(categoryIncome.state.percentOne);
    const [percentTwo, setpercentTwo] = useState(categoryIncome.state.percentTwo);
    const [percentThree, setPercentThree] = useState(categoryIncome.state.percentThree);
    const [showToast, setShowToast] = useState(false);

    const navigation = useNavigation();

    const handleSave = () => {
        if (parseInt(percentOne) + parseInt(percentTwo) + parseInt(percentThree) !== 100
        || income === 0 || labelOne === "" || labelTwo === "" || labelThree === "") {
            setShowToast(true);
        } else {
            categoryIncome.updateCategoriesIncome(
                amountToDatabase(income), 
                labelOne.toUpperCase(),
                parseInt(percentOne),
                labelTwo.toUpperCase(),
                parseInt(percentTwo),
                labelThree.toUpperCase(),
                parseInt(percentThree)
                );
            transaction.editCategoryName(labelOne.toUpperCase(), labelTwo.toUpperCase(), labelThree.toUpperCase());
            navigation.dispatch(StackActions.pop(1));
        }
    };

    return (
        <View>
            <Toast
                show={showToast}
                onRequestClose={() => setShowToast(false)} 
                onPress={() => setShowToast(false)}
                text="Please fill out income, category names, and ensure that percentage numbers total 100."
            />
            <View style={styles.container}>
                <Text style={styles.text}>INCOME:</Text>
                <CurrencyInput
                    value={income}
                    onChangeValue={setIncome}
                    unit="£"
                    delimiter=","
                    separator="."
                    precision={2}
                    text={income}
                    maxLength={9}
                    textAlign={"center"}
                    keyboardType={"number-pad"}
                    style={styles.currencyInput}
                />
            </View>
            <View style={styles.labelContainer}>
                <View style={styles.labelView}>
                    <TextInput
                        value={labelOne.toUpperCase()}
                        onChangeText={setLabelOne}
                        textAlign={"center"}
                        maxLength={8}
                        style={styles.labelInput}
                    />
                    <TextInput
                        value={labelTwo.toUpperCase()}
                        onChangeText={setLabelTwo}
                        textAlign={"center"}
                        maxLength={8}
                        style={styles.labelInput}
                    />
                    <TextInput
                        value={labelThree.toUpperCase()}
                        onChangeText={setLabelThree}
                        textAlign={"center"}
                        maxLength={8}
                        style={styles.labelInput}
                    />
                </View>
                <View style={styles.iconView}>
                    <Icon name="needs" style={{...styles.icon, color: "#9ce0ff"}}/>
                    <Icon name="wants" style={{...styles.icon, color: "#1489cc"}}/>
                    <Icon name="goals" style={{...styles.icon, color: "#024f86"}}/>
                </View>
                <View style={styles.percentContainer}>
                    <View style={styles.percentView}>
                        <TextInput
                            value={percentOne.toString()}
                            onChangeText={setpercentOne}
                            textAlign={"center"}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            style={styles.percentInput}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                    <View style={styles.percentView}>
                        <TextInput
                            value={percentTwo.toString()}
                            onChangeText={setpercentTwo}
                            textAlign={"center"}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            style={styles.percentInput}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                    <View style={styles.percentView}>
                        <TextInput
                            value={percentThree.toString()}
                            onChangeText={setPercentThree}
                            textAlign={"center"}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            style={styles.percentInput}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                </View>
                <View style={styles.saveView}>
                    <CustomButton text="save" onPress={handleSave} />
                </View>
                <View style={styles.lowerTitle}>
                    <Text style={styles.title}>TAGS</Text>
                </View>
                <AddTag
                    text="Your tag here ..."
                    color="#efefef"
                    styling={styles.addTag}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginVertical: 20
    },
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e",
        lineHeight: 55,
        paddingRight: 10
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
    currencyInput: {
        padding: 10,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontSize: 28,
        color: "#03045e",
        fontFamily: "Nunito-Regular"
    },
    labelInput: {
        fontFamily: "Nunito-Bold",
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: "#efefef",
        borderRadius: 10,
        color: "#03045e",
        height: 40
    },
    icon: {
        flex: 1,
        fontSize: 42,
        textAlign: "center"
    },
    percentView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    percentInput: {
        fontFamily: "Nunito-Bold",
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontSize: 16,
        color: "#03045e",
        height: 40
    },
    percentContainer: {
        flexDirection: "row",
        alignContent: "center",
        paddingTop: 15,
        marginBottom: 30
    },
    labelContainer: {
        alignItems: "center"
    },
    labelView: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 10
    },
    iconView: {
        flexDirection: "row",
        alignContent: "center",
        paddingTop: 15
    },
    saveView: {
        marginBottom: 20
    },
    lowerTitle: {
        borderBottomColor: "#48cae4",
        borderBottomWidth: 1,
        marginBottom: 25
    },
    addTag: {
        paddingBottom: 25,
        paddingTop: 10
    }
});

export default SettingsHeader;