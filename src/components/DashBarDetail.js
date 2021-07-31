import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GlobalStyle from "./GlobalStyle";
import {percentSpentString} from "../utilities/helper";

const DashBarDetail = (props) => {

    return (
        props.percentSpent !== undefined ? <View>
            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                <Text>
                    <Text style={GlobalStyle.BlueBold}>{props.label}</Text>
                    <Text style={GlobalStyle.BlueRegular}>{props.amountRemaining}</Text>
                </Text>
            </View>
            <View style={styles.container}>
                <View>
                    <View style={styles.barBackground}>
                        <View style={{...styles.barColor, width: props.percentSpent >= 100 ? "100%": percentSpentString(props.percentSpent), backgroundColor: props.color}}>
                        </View>
                    </View>
                </View>
                <View >
                    <Text>
                        <Text style={GlobalStyle.BlueBold}>SPENT: </Text>
                        <Text style={GlobalStyle.BlueRegular}>{props.amountSpent}</Text>
                    </Text>
                </View>
            </View>
        </View> : null
    )
};

DashBarDetail.defaultProps = {
    initialValues: {
      label: "",
      amountRemaining: "",
      percentSpent: 5,
      backgroundColor: "white",
      amountSpent: ""
    }
  };

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },

    barBackground: {
        width: "100%",
        height: 25,
        borderRadius: 5,
        backgroundColor: "#efefef",
    },

    barColor: {
        height: 25,
        borderRadius: 5
    },
});

export default DashBarDetail;


//<View style={{...styles.barColor, width: Number(props.percentSpent.replace("%", "")) >= 100 ? "100%": props.percentSpent, backgroundColor: props.color}}>