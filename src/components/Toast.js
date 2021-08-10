import React from "react";
import {View, StyleSheet, Text, Modal} from "react-native";
import CustomButton from "./CustomButton";
import GlobalStyle from "./GlobalStyle";

// Custom toast modal with one button used to tell users when input is invalid

const Toast = (props) => {

    return (
        <Modal
            visible={props.show}
            onRequestClose={props.onRequestClose}
            transparent
            >
            <View style={styles.modalView}>
                <View style={styles.innerContainer}>
                    <Text style={[GlobalStyle.BlueRegular, styles.text]}>{props.text}</Text>
                    <View style={styles.view}>
                        <CustomButton text="OK" onPress={props.onPress}/>
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
        marginVertical: 15,
        marginHorizontal: 15,
        textAlign: "center"
    },
    view: {
        marginBottom: 15
    }
});

export default Toast;