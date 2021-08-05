import React, {useContext, useState} from "react";
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import Icon from "../components/Icon";
import {Context} from "../context/ReminderContext"
import {formatDate, formatDateForDatabase} from "../utilities/helper";
import {DateTimePickerModal} from "react-native-modal-datetime-picker";
import Toast from "../components/Toast";

const ReminderHeader = () => {
    const {addReminder} = useContext(Context);
    const [newDescription, setNewDescription] = useState("");
    const [date, setDate] = useState("DD/MM/YY");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleOnConfirm = (value) => {
        setDate(formatDate(value));
        setShowDatePicker(false);
      };

    const handleOnPress = () => {
        if (newDescription === "" || date === "DD/MM/YY") {
            setShowToast(true);
        } else {
            addReminder(newDescription, formatDateForDatabase(date));
            setDate("DD/MM/YY");
            setNewDescription("");
        }
    };

    return (
        <View style={styles.container}>
            <Toast 
                show={showToast}
                onRequestClose={() => setShowToast(false)}
                onPress={() => setShowToast(false)}
                text="Please choose a date and text for a reminder."
            />
            <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    onCancel={() => {setShowDatePicker(false)}}
                    onConfirm={handleOnConfirm}
                    maximumDate={new Date(2025, 11, 31)}
                    minimumDate={new Date()}
                    />
            <View style={styles.innerContainer}>
                <View style={styles.dateView}>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} >
                        <Text style={{...styles.dateButton, color: date === "DD/MM/YY" ? "#b7b7b7" : "#03045e"}}>{date}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: "50%"}}>
                    <TextInput 
                        placeholder="Your reminder ..." 
                        placeholderTextColor="#b7b7b7"
                        maxLength={75}
                        value={newDescription}
                        onChangeText={text => setNewDescription(text)}
                        style={styles.reminderInput}              
                    />
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={handleOnPress}>
                        <Icon name="add" style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15
    },
    innerContainer: {
        flex: 1, flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-between"
    },
    dateView: {
        width: "30%",
        backgroundColor: "#efefef",
        borderRadius: 10,
        alignContent: "center"
    },
    dateButton: {
        padding: 10,
        textAlign: "center",
        fontFamily: "Nunito-Regular"
    },
    reminderInput: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontFamily: "Nunito-Regular",
        color: "#03045e",
        height: 39
    },
    buttonView: {
        width: "15%",
        alignItems: "flex-end"
    },
    icon: {
        fontSize: 39,
        color: "#48cae4"
    }
});

export default ReminderHeader;

