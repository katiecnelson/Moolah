import React, { useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import Icon from "./Icon";

const NeedWantGoalDetail = (props) => {

    useEffect(() => {
        console.log("Use effect from NeedWantGoalDetail fired!")
      }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            <Icon name={props.iconName} style={{paddingVertical: 5, fontSize: 32, color: props.color}} />
            <Text style={styles.text}>{props.amount}</Text>
        </View>
    )
};

NeedWantGoalDetail.defaultProps = {
    initialValues: {
      title: "",
      amount: "",
      iconName: "",
      color: "white"
    }
  };

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: "Nunito-Bold",
        fontSize: 14,
        color: "#03045e"
    },

    icon: {
        fontSize: 32
    }
});

export default NeedWantGoalDetail;