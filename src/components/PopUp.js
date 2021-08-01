import React, {useState} from "react";
import {View, Modal, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "./Icon";
import CustomButton from "./CustomButton";
import {DateTimePickerModal} from "react-native-modal-datetime-picker";
import {formatDate, formatFullDate} from "../utilities/helper";

const PopUp = (props) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleOnConfirm = (value) => {
        props.onChangeDate(value);
        setShowDatePicker(false);
      };

    return (
        <Modal
            visible={props.visible}
            onRequestClose={props.close}
            transparent
            >
        <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onCancel={() => {setShowDatePicker(false)}}
                onConfirm={handleOnConfirm}
                maximumDate={new Date(2025, 11, 31)}
                minimumDate={new Date()}
                />
            <View style={styles.modalView}>
                <View style={styles.width} >
                    <View style={styles.modal}>
                        <View>
                            <TouchableOpacity
                                style={styles.exitOpacity}
                                onPress={props.close}
                            >
                                <Text style={styles.exit}>X</Text>
                            </TouchableOpacity>
                        </View>
                        {( props.showDate 
                            ? <View style={{alignItems: "center", marginBottom: 10}}>
                                <View style={{width: "45%", backgroundColor: "#efefef", borderRadius: 10, alignContent: "center"}}>
                                    <TouchableOpacity onPress={() => setShowDatePicker(true)} >
                                        <Text style={{padding: 10, textAlign: "center", color: props.date === "DD/MM/YY" ? "#b7b7b7" : "#03045e", fontFamily: "Nunito-Regular", fontSize: 20}}>{formatFullDate(props.date)}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                        )}
                        <TextInput
                            value={props.text}
                            maxLength={props.maxLength}
                            style={styles.textInput}
                            onChangeText={props.onChangeText}
                        />
                        <View style={styles.updateView}>
                            <CustomButton
                                text="UPDATE" 
                                onPress={props.onUpdate}
                            />
                        </View>
                        <View style={styles.deleteView}>
                            <TouchableOpacity onPress={props.delete}
                            > 
                                <Icon name="delete" style={styles.deleteIcon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e"
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(75, 75, 75, 0.25)",
    },
    width: {
        width: "84%",
    },
    modal: {
        borderLeftWidth: 10,
        borderTopWidth: 10,
        borderTopLeftRadius:15,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: "#03045e",
        backgroundColor: "white",
        paddingHorizontal: 7,
        paddingVertical: 7,
        borderRadius: 10,
        elevation: 35,
    },
    exitOpacity: {
        width: 20,
    },
    exit: {
        fontFamily: "Nunito-Black",
        color: "#03045e",
        fontSize: 24,
    },
    textInput: {
        padding: 10,
        marginTop:10,
        marginBottom: 30,
        marginHorizontal: 7,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontSize: 20,
        color: "#03045e",
    },
    deleteView: {
        alignItems: "flex-end",
        width: "100%",
    },
    deleteIcon: {
        fontSize: 36,
        color: "#03045e",
        padding: 5,
    },
    updateView: {
        alignItems: "center",
    }
})

export default PopUp;


