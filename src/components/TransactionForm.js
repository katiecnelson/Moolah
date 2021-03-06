import React, {useState, useContext} from "react";
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Icon from "../components/Icon";
import CustomButton from "../components/CustomButton";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {DateTimePickerModal} from "react-native-modal-datetime-picker";
import {useNavigation} from "@react-navigation/native";
import CurrencyInput from "react-native-currency-input";
import Toast from "../components/Toast";
import TagModal from "./TagModal";
import GlobalStyle from "./GlobalStyle";
import {
    formatAmountNum,
    formatDateForDatabase,
    amountToDatabase,
    categoryNameToID,
    formatDate,
    formatFullDate,
    getTodayDateDatabase
    } from "../utilities/helper";


// Returns JSX used to gather user input for New/Edit Transaction screens
 

const TransactionForm = ({initialValues, onSubmit, showDelete, showIncome, onPress}) => {
    const categoryIncome = useContext(CategoryIncomeContext);
    const navigation = useNavigation();

    const [showToast, setShowToast] = useState(false);

    const [amount, setAmount] = useState(formatAmountNum(initialValues.amount));
    const [description, setDescription] = useState(initialValues.description);

    // Buttons to choose category
    const [categoryID, setCategoryID] = useState(categoryNameToID(initialValues.categoryValue));
    const [categoryValue, setCategoryValue] = useState(initialValues.categoryValue);
    const [categoryLabel, setCategoryLabel] = useState(initialValues.categoryLabel);

    // Date picker state
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(formatFullDate(initialValues.date));

    // Dropdown list state
    const [openDropdown, setOpenDropdown] = useState(false);
    const [tagLabel, setTagLabel] = useState(initialValues.tag);
    const [tag, setTag] = useState(initialValues.tagID);

    // Sets the date chosen in the date picker
    const handleOnConfirm = (value) => {
        setDate(formatDate(value));
        setShowDatePicker(false);
      };
    
    // Sends the transaction information to the data store after validating it
    const addTransaction = () => {
        if (amount === 0 || amount === null || categoryValue === null) {
            setShowToast(true);
        } else {
            onSubmit(
                amountToDatabase(amount),
                formatDateForDatabase(date),
                description,
                tag,
                tagLabel === "TAG (OPTIONAL)"
                ? null
                : tagLabel,
                categoryID,
                categoryLabel,
                categoryValue);
        }
    };

    // Sets the user's selected category into local state
    const chooseCategory = (ID, value, label) => {
        setCategoryID(ID);
        setCategoryValue(value);
        setCategoryLabel(label);
    };

    // Sets the user's tag select into local state hook
    const tagDone = (name, ID) => {
        setOpenDropdown(false);
        setTagLabel(name);
        setTag(ID);
    };

    return (
        <KeyboardAwareScrollView
            keyboardOpeningTime={10}
            contentContainerStyle={styles.container}>
            <Toast 
                show={showToast}
                onRequestClose={() => setOpenDropdown(false)}
                onPress={() => setShowToast(false)}
                text="Please input an amount and select a category."
            />
            {(
            showIncome ?
                <TouchableOpacity
                    style={styles.editIncomeOpacity}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Icon name="edit" style={styles.incomeIcon}/>
                    <Text style={[GlobalStyle.TealBold, styles.incomeText]}>EDIT INCOME</Text>
                </TouchableOpacity>
            : <View style={styles.topView}/>
            )}
            <View style={styles.currencyView}>
                <CurrencyInput
                    returnKeyLabel="Done"
                    returnKeyType="done"
                    textAlign={"center"}
                    keyboardType={"number-pad"}
                    style={[GlobalStyle.BlueRegular, styles.currencyIn]}
                    value={amount}
                    onChangeValue={setAmount}
                    unit="??"
                    prefix="??"
                    delimiter=","
                    separator="."
                    precision={2}
                    maxLength={10}
                    />
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                    <Text style={[GlobalStyle.BlueRegular, styles.dateText]}>{date}</Text>  
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    onCancel={() => {setShowDatePicker(false)}}
                    onConfirm={handleOnConfirm}
                    minimumDate={new Date(2021, 0, 1)}
                    maximumDate={new Date()}
                    themeVariant="light"
                />
            <View style={styles.needsWantsGoals}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => chooseCategory(1, "one", categoryIncome.state.labelOne)}
                    style={styles.containerIcons}>
                    <View style={{...styles.radius, backgroundColor: categoryID === 1 ? "#efefef" : "white"}}>
                        <Icon name="needs" style={{...styles.icon, color: "#9ce0ff"}} />
                    </View>
                    <Text numberOfLines={1} style={GlobalStyle.BlueBold}>{categoryIncome.state.labelOne}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => chooseCategory(2, "two", categoryIncome.state.labelTwo)}
                    style={styles.containerIcons}>
                    <View style={{...styles.radius, backgroundColor: categoryID === 2 ? "#efefef" : "white"}}>
                        <Icon name="wants" style={{...styles.icon, color: "#1489cc"}} />
                    </View>
                    <Text numberOfLines={1} style={GlobalStyle.BlueBold}>{categoryIncome.state.labelTwo}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => chooseCategory(3, "three", categoryIncome.state.labelThree)}
                    style={styles.containerIcons}>
                    <View style={{...styles.radius, backgroundColor: categoryID === 3 ? "#efefef" : "white"}}>
                        <Icon name="goals" style={{...styles.icon, color: "#024f86"}} />
                    </View>
                    <Text numberOfLines={1} style={GlobalStyle.BlueBold}>{categoryIncome.state.labelThree}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setOpenDropdown(true)} style={styles.tagOpacity}>
                <View style={styles.tagView}>
                    <Text style={{
                        ...styles.descriptionText,
                        ...GlobalStyle.Regular,
                        color: tagLabel === "TAG (OPTIONAL)"
                        || tagLabel === null 
                        ? "#b7b7b7"
                        : "#03045e"
                        }}>{tagLabel === null
                        ? "TAG (OPTIONAL)"
                        : tagLabel}</Text>
                    <Icon name="down" style={styles.arrow}/>
                </View>
            </TouchableOpacity>
            <TextInput
                returnKeyType="done"
                placeholder="DESCRIPTION (OPTIONAL)" 
                value={description}
                maxLength={20}
                placeholderTextColor="#b7b7b7"
                onChangeText={text => setDescription(text)}
                style={[GlobalStyle.BlueRegular, styles.descriptionIn]}
            />
            <TagModal 
                open={openDropdown}
                close={() => setOpenDropdown(false)}
                press={() => setOpenDropdown(false)}
                done={(name, ID) => tagDone(name, ID)}
            />
            <CustomButton text="SAVE" onPress={addTransaction}/>
            <View style={styles.bottomView}>
            {(
             showDelete ?
             <View style={styles.deleteView}>
                <TouchableOpacity onPress={onPress}>
                    <Icon name="delete" style={styles.deleteIcon}/>
                </TouchableOpacity>
             </View>
             : null
            )}
            </View>
        </KeyboardAwareScrollView>
    );
};

TransactionForm.defaultProps = {
    initialValues: {
        amount: 0,
        date: getTodayDateDatabase(),
        categoryValue: null,
        categoryLabel: "",
        description: null,
        tag: "TAG (OPTIONAL)",
        tagID: null
    }
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flex: 1,
    },
    needsWantsGoals: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: "auto"
    },
    icon: {
        fontSize: 42,
        padding: 7,
    },
    incomeText: {
        lineHeight: 32
    },
    incomeIcon: {
        fontSize: 32,
        color: "#48cae4",
        paddingRight: 10
    },
    containerIcons: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    editIncomeOpacity: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 15,
        paddingTop: 20
    },
    deleteView: {
        alignItems: "flex-end",
    },
    deleteIcon: {
        fontSize: 32,
        color: "#03045e",
        paddingRight: 15,
        paddingBottom: 15,
    },
    topView: {
        height: 40
    },
    currencyIn: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontSize: 24,
        width: "48%",
    },
    radius: {
        borderRadius: 10
    },
    tagOpacity: {
        width: "94%",
        marginBottom: 25
    },
    tagView: {
        borderRadius: 10,
        backgroundColor: "#efefef",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    descriptionIn: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontSize: 18,
        width: "94%",
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignContent: "flex-end",
        width: "100%"
    },
    descriptionText: {
        fontSize: 18,
        padding: 15,
    },
    arrow: {
        fontSize: 20,
        color: "#48cae4",
        lineHeight: 54,
        paddingRight: 10
    },
    datePicker: {
        backgroundColor: "#efefef",
        borderRadius: 10,
        width: "48%",
        alignItems: "center"
    },
    dateText: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        fontSize: 24,
    },
    currencyView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "94%"
    }
});

export default TransactionForm;