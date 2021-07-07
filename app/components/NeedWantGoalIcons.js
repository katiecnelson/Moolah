import React from "react";
import { View, StyleSheet, Text } from "react-native";
import NeedWantGoalDetail from "./NeedWantGoalDetail";

const NeedWantGoalIcons = () => {
    return (
        <View style={styles.container}>
            <NeedWantGoalDetail
                title="NEEDS"
                iconName="needs"
                color="#9ce0ff"
                amount="£650.00"
            />
            <NeedWantGoalDetail
                title="WANTS"
                iconName="wants"
                color="#1489cc"
                amount="£390.00"
            />
            <NeedWantGoalDetail
                title="GOALS"
                iconName="goals"
                color="#024f86"
                amount="£260.00"
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 20,
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: "auto"
    },

})

export default NeedWantGoalIcons;