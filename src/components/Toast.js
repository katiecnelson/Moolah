import React from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import CustomButton from "./CustomButton";

const Toast = (props) => {

    return (
        <Modal
            visible={props.show}
            onRequestClose={props.onRequestClose}
            transparent
            >
            <View style={styles.modalView}>
                <View style={{width: "90%", backgroundColor: "white", borderRadius: 10}}>
                    <Text style={{fontSize: 18, color: "#03045e", fontFamily: "Nunito-Regular", marginVertical: 15, marginHorizontal: 15, textAlign: "center" }}>{props.text}</Text>
                    <View style={{marginBottom: 15}}>
                        <CustomButton text="OK" onPress={props.onPress}/>
                    </View>
                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(75, 75, 75, 0.3)",
    },
})

export default Toast;