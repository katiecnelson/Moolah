import React, {useState, useContext} from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";
import Icon from "./Icon";
import {getTodayDateDatabase, formatFullDate, formatDateForDatabase, formatDate, formatDateDBStyle} from "../utilities/helper";
import {Context as ReminderContext} from "../context/ReminderContext";
import PopUp from "./PopUp";

const ReminderDetail = (props) => {
    const reminder = useContext(ReminderContext);
    const today = getTodayDateDatabase();
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState(props.description);
    const [date, setDate] = useState(props.date)  

    const handleOnPress = () => {
        if (props.done) {
            reminder.doneReminder(0, props.ID);
        } else {
            reminder.doneReminder(1, props.ID);
        }
    }

    return (
        <View style={styles.container}>
            <PopUp
                date={date}
                showDate={true} 
                visible={modalVisible}
                close={() => setModalVisible(false)}
                text={description}
                maxLength={75}
                onChangeDate={value => setDate(formatDateDBStyle(value))}
                onChangeText={text => setDescription(text)}
                onUpdate={() => {reminder.updateReminder(props.ID, description, date, props.done), setModalVisible(false)}}
                delete={() => {reminder.deleteReminder(props.ID), setModalVisible(false)}}
            />
            <TouchableOpacity style={{flexDirection: "row", width: "100%"}} onPress={handleOnPress}> 
                <CustomCheckbox doneStatus={props.done} />
                <Text style={{flex: 1.3, lineHeight: 24, paddingLeft: 10, textDecorationLine: !props.done ? "none" : "line-through", fontFamily: date <= today ? "Nunito-Bold" : "Nunito-Regular", color: props.date <= today ? "#48cae4": "#03045e"}}>{props.date === today ? "TODAY" : formatFullDate(props.date)}</Text>
                <Text style={{flex: 3, lineHeight: 24, fontFamily: "Nunito-Regular", textDecorationLine: !props.done ? "none" : "line-through", color: "#03045e"}}>{props.description}</Text>
                <TouchableOpacity style={{width: "15%", alignItems: "flex-end"}} onPress={() => setModalVisible(true)}>
                    <Icon name="edit" style={{...styles.editIcon, flex: .5}}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 7
    },

    editIcon: {
        fontSize: 28,
        color: "#48cae4"
    },
})

export default ReminderDetail;