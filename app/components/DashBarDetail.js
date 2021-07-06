import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DashBarDetail = (props) => {
    return (
        <View>
            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                <Text>
                    <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>{props.label}</Text>
                    <Text style={{fontFamily: "Nunito-Regular", color: "#03045e"}}>{props.amountRemaining}</Text>
                </Text>
            </View>
            <View style={styles.container}>
                <View>
                    <View style={{width: "100%", height: 25, borderRadius: 5, backgroundColor: "#efefef"}}>
                        <View style={{width: props.percentSpent, height: 25, borderRadius: 5, backgroundColor: props.color}}>
                        </View>
                    </View>
                </View>
                <View >
                    <Text>
                        <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>SPENT: </Text>
                        <Text style={{fontFamily: "Nunito-Regular", color: "#03045e"}}>{props.amountSpent}</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // width: "94%",
        flexDirection: "column",
        // justifyContent: "flex-end"
    },

    text: {

    },

    textBold: {

    }
});

export default DashBarDetail;