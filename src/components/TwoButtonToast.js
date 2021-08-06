import React from "react";
import {View, StyleSheet, Text, Modal} from "react-native";
import CustomButton from "./CustomButton";

const TwoButtonToast = (props) => {

    return (
        <Modal
            visible={props.show}
            onRequestClose={props.onRequestClose}
            transparent
            >
            <View style={styles.modalView}>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>{props.text}</Text>
                    <View style={styles.view}>
                        <CustomButton text="CANCEL" onPress={props.cancel}/>
                        <CustomButton text="YES, DELETE" onPress={props.delete}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(75, 75, 75, 0.3)",
    },
    innerContainer: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10
    },
    text: {
        fontSize: 18,
        color: "#03045e",
        fontFamily: "Nunito-Regular",
        marginVertical: 15,
        marginHorizontal: 15,
        textAlign: "center"
    },
    view: {
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-around"
    }
});

export default TwoButtonToast;