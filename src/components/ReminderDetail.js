import React, {useState, useContext} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";
import Icon from "./Icon";
import {getTodayDateDatabase, formatFullDate, formatDateDBStyle} from "../utilities/helper";
import {Context as ReminderContext} from "../context/ReminderContext";
import PopUp from "./PopUp";
import TwoButtonToast from "./TwoButtonToast";
import GlobalStyle from "./GlobalStyle";

const ReminderDetail = (props) => {
    const reminder = useContext(ReminderContext);
    const today = getTodayDateDatabase();
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState(props.description);
    const [date, setDate] = useState(props.date);
    const [showToast, setShowToast] = useState(false);

    const handleOnPress = () => {
        if (props.done) {
            reminder.doneReminder(0, props.ID);
        } else {
            reminder.doneReminder(1, props.ID);
        }
    };

    const handleOnUpdate = () => {
        reminder.updateReminder(props.ID, description, date, props.done);
        setModalVisible(false);
    };

    const handleDelete = () => {
        reminder.deleteReminder(props.ID);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TwoButtonToast
                show={showToast}
                onRequestClose={() => {setShowToast(false); setModalVisible(true);}}
                cancel={() => {setShowToast(false); setModalVisible(true);}}
                delete={handleDelete}
                text="Permanently delete this reminder?"
            />
            <PopUp
                date={date}
                showDate={true} 
                visible={modalVisible}
                close={() => setModalVisible(false)}
                text={description}
                maxLength={75}
                onChangeDate={value => setDate(formatDateDBStyle(value))}
                onChangeText={text => setDescription(text)}
                onUpdate={handleOnUpdate}
                delete={() => {setModalVisible(false); setShowToast(true);}}
            />
            <TouchableOpacity style={styles.touchOpacity} onPress={handleOnPress}> 
                <CustomCheckbox doneStatus={props.done} />
                <Text style={{
                    ...styles.dateText,
                    textDecorationLine: !props.done
                    ? "none"
                    : "line-through",
                    fontFamily: date <= today
                    ? "Nunito-Bold"
                    : "Nunito-Regular",
                    color: props.date <= today
                    ? "#48cae4"
                    : "#03045e"
                    }}>
                    {props.date === today
                    ? "TODAY"
                    : formatFullDate(props.date)
                    }</Text>
                <Text style={{
                    ...styles.text,
                    ...GlobalStyle.BlueRegular,
                    textDecorationLine: !props.done
                    ? "none"
                    : "line-through"
                    }}>{props.description}</Text>
                <TouchableOpacity style={styles.editOpacity} onPress={() => setModalVisible(true)}>
                    <Icon name="edit" style={styles.editIcon}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 7
    },
    touchOpacity: {
        flexDirection: "row",
        width: "100%"
    },
    editIcon: {
        fontSize: 28,
        color: "#48cae4",
        flex: .5
    },
    editOpacity: {
        width: "15%",
        alignItems: "flex-end"
    },
    dateText: {
        flex: 1.3,
        lineHeight: 24,
        paddingLeft: 10, 
    },
    text: {
        flex: 3,
        lineHeight: 24,
    }
});

export default ReminderDetail;