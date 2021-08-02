import React from "react";
import { View, StyleSheet, Text} from "react-native";

const ReminderFooter = (props) => {

    return (
        <View style={styles.container}>
            <Text style={{fontFamily: "Nunito-Bold", fontSize: 16, color: "#48cae4"}}>{props.showCompleted ? "SHOW COMPLETED" : "HIDE COMPLETED"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: "center"
    },
})

export default ReminderFooter;