import React from "react";
import {View, Text, StyleSheet} from "react-native";
import GlobalStyle from "./GlobalStyle";
import {percentSpentString} from "../utilities/helper";

const DashBarDetail = (props) => {
    
    return (
       props.percentSpent !== undefined ?  <View>
            <View style={styles.container}>
                <Text>
                    <Text style={GlobalStyle.BlueBold}>{props.label}</Text>
                    <Text style={GlobalStyle.BlueRegular}>{props.amountRemaining}</Text>
                </Text>
            </View>
            <View style={styles.barView}>
                <View>
                    <View style={styles.barBackground}>
                       {( props.percentSpent > 0 ?
                       <View
                            style={{
                            ...styles.barColor, 
                            width: props.percentSpent >= 100 
                            ? "100%"
                            : percentSpentString(props.percentSpent),
                            backgroundColor: props.color
                            }}>
                        </View>
                        : null
                        )}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        justifyContent: "flex-end",
    },
    barView: {
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