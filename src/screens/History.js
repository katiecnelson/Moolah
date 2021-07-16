import React from "react";
import { View, StyleSheet, Text } from "react-native";

const History = () => {

    return (
        <View style={styles.container}>
            <Text>History Screen!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#ffffff",
        flex: 1,
    },
});

export default History;