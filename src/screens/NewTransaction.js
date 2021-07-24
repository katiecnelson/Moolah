import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal, FlatList, Alert } from "react-native";
import Icon from "../components/Icon";
import CustomButton from "../components/CustomButton";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {getDateToDisplay, formatDate} from "../utilities/helper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Context as TagContext} from "../context/TagContext"
import {Context as TransactionContext} from "../context/TransactionContext";
import SettingsFooter from "../components/SettingsFooter";
import { useNavigation } from '@react-navigation/native';
import CurrencyInput from 'react-native-currency-input';
import Toast from "../components/Toast";
import {formatDateForDatabase, amountToDatabase} from "../utilities/helper"

const NewTransaction = () => {
    const categoryIncome = useContext(CategoryIncomeContext);
    const transaction = useContext(TransactionContext);
    const tags = useContext(TagContext);
    const navigation = useNavigation();

    const [showToast, setShowToast] = useState(false)
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState(null)

    //Buttons to choose category

    const [categoryID, setCategoryID] = useState(0)
    const [categoryValue, setCategoryValue] = useState(null)
    const [categoryLabel, setCategoryLabel] = useState("")
    //Date picker state
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(getDateToDisplay());
    //Drop down list state
    const [openDropdown, setOpenDropdown] = useState(false);
    const [tagLabel, setTagLabel] = useState("TAG (OPTIONAL)")
    const [tag, setTag] = useState(null)

    const handleOnConfirm = (value) => {
        setDate(formatDate(value));
        setShowDatePicker(false)
      };
    
    const addTransaction = () => {
        if (amount === 0 || amount === null || categoryValue === 0) {
            setShowToast(true);
        } else {
            // (amount, date, description, tag, tagLabel, categoryID, categoryLabel, categoryValue)
            transaction.addTransaction(amountToDatabase(amount), formatDateForDatabase(date), description, tag, tagLabel, categoryID, categoryLabel, categoryValue)
        }
    }

      useEffect(() => {
        tags.getTags();
      }, []);

    return (
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
            <Toast show={showToast} onRequestClose={() => setOpenDropdown(false)} onPress={() => setShowToast(false)} text="Please input an amount and select a category."/>
            <TouchableOpacity style={{flexDirection: "row", paddingBottom: 15, paddingTop: 20}} onPress={() => navigation.navigate("Settings")}>
                <Icon name="edit" style={{fontSize: 32, color: "#48cae4", paddingRight: 10}}/>
                <Text style={{color: "#48cae4", lineHeight: 32}}>EDIT INCOME</Text>
            </TouchableOpacity>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "94%"}}>
                <CurrencyInput
                    textAlign={"center"}
                    keyboardType={"number-pad"}
                    style={{padding: 10, backgroundColor: "#efefef", borderRadius: 10, fontSize: 28, color: "#03045e", width: "48%"}}
                    value={amount}
                    onChangeValue={setAmount}
                    unit="£"
                    delimiter=","
                    separator="."
                    precision={2}
                    />
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{backgroundColor: "#efefef", borderRadius: 10, width: "48%", alignItems: "center" }}>
                    <Text style={{padding: 15, fontSize: 28, color: "#03045e"}}>{date}</Text>  
                </TouchableOpacity>
                
            </View>
            <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    onCancel={() => {setShowDatePicker(false)}}
                    onConfirm={handleOnConfirm}
                />
            <View style={styles.needsWantsGoals}>
                <TouchableOpacity activeOpacity={.8} onPress={() => {setCategoryID(1); setCategoryValue("one"); setCategoryLabel(categoryIncome.state.labelOne)}} style={styles.containerIcons}>
                    <View style={{backgroundColor: categoryID === 1 ? "#efefef" : "white", borderRadius: 10}}>
                        <Icon name="needs" style={{...styles.icon, color: "#9ce0ff"}} />
                    </View>
                    <Text style={styles.textBold}>{categoryIncome.state.labelOne}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} onPress={() => {setCategoryID(2); setCategoryValue("two"); setCategoryLabel(categoryIncome.state.labelTwo)}} style={styles.containerIcons}>
                    <View style={{backgroundColor: categoryID === 2 ? "#efefef" : "white", borderRadius: 10}}>
                        <Icon name="wants" style={{...styles.icon, color: "#1489cc"}} />
                    </View>
                    <Text style={styles.textBold}>{categoryIncome.state.labelTwo}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} onPress={() => {setCategoryID(3); setCategoryValue("three"); setCategoryLabel(categoryIncome.state.labelThree)}} style={styles.containerIcons}>
                    <View style={{backgroundColor: categoryID === 3 ? "#efefef" : "white", borderRadius: 10}}>
                        <Icon name="goals" style={{...styles.icon, color: "#024f86"}} />
                    </View>
                    <Text style={styles.textBold}>{categoryIncome.state.labelThree}</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                placeholder="DESCRIPTION (OPTIONAL)" 
                placeholderTextColor="#b7b7b7"
                onChangeText={text => setDescription(text)}
                style={{marginBottom: 20, padding: 15, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e", width: "94%", fontFamily: "Nunito-Regular"}}
            />
            <TouchableOpacity onPress={() => setOpenDropdown(true)} style={{width: "94%", marginBottom: 25}}>
                <View style={{borderRadius: 10, backgroundColor: "#efefef", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 18, padding: 15, color: tagLabel === "TAG (OPTIONAL)" ? "#b7b7b7" : "#03045e", fontFamily: "Nunito-Regular"}}>{tagLabel}</Text>
                    <Icon name="down" style={{fontSize: 20, color: "#48cae4", lineHeight: 54, paddingRight: 10}}/>
                </View>
            </TouchableOpacity>
            <Modal
                visible={openDropdown}
                onRequestClose={() => setOpenDropdown(false)}
                transparent
                >
                <View style={styles.modalView}>
                    <View style={{height: "75%", width: "80%", backgroundColor: "#efefef", borderRadius: 10}}>
                        <TouchableOpacity style={styles.exitOpacity} onPress={() => setOpenDropdown(false)}>
                            <Text style={styles.exit}>X</Text>
                        </TouchableOpacity>
                   
                    <FlatList
                        data={tags.state.sort((a, b) => a["Name"].localeCompare(b["Name"]))}
                        ListHeaderComponent={() => <SettingsFooter
                            text="NEW TAG ..."
                            color="#fcfcfc"
                        />
                        }
                        keyExtractor={(item, index) => item.ID.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {setOpenDropdown(false), setTagLabel(item["Name"]), setTag(item["ID"])}}>
                                <View style={{borderBottomColor: "#03045e", borderBottomWidth: 1}}>
                                    <Text style={{fontFamily: "Nunito-Regular", color: "#03045e", fontSize: 18, padding: 15}}>{item["Name"]}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                     </View>
                </View>
                
            </Modal>
            <CustomButton text="add" onPress={addTransaction}/>
            <View style={{flex: 1}}/>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flex: 1,
        justifyContent: "flex-end"
    },

    needsWantsGoals: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: "auto"
    },

    text: {
        fontFamily: "Nunito-Regular",
        color: "#03045e"
    },
    icon: {
        fontSize: 42,
        padding: 7,
    },
    textBold: {
        fontFamily: "Nunito-Bold",
        color: "#03045e"
    },
    containerIcons: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    exitOpacity: {
        width: 50,
    },
    exit: {
        fontFamily: "Nunito-Black",
        color: "#03045e",
        fontSize: 24,
        paddingLeft: 10,
        paddingVertical: 7
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(75, 75, 75, 0.25)",
    },
})

export default NewTransaction;