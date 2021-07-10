import React from "react";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import Icon from "../components/Icon";

const Reminders = () => {
    return (
        <View style={styles.container}>
            <Text>This is Reminders!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
})

export default Reminders;