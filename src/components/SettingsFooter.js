import React, {useState, useContext} from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { Context as TagContext } from "../context/TagContext";

const SettingsFooter = (props) => {
    const tag = useContext(TagContext);
    const [name, setName] = useState("");

    return (
        <View style={[styles.flex, props.styling]}>
            <TextInput
                value={name}
                maxLength={15}
                placeholder={props.text}
                placeholderTextColor="#b7b7b7"
                style={{...styles.textInput, backgroundColor: props.color}}
                onChangeText={text => setName(text)}
            />
            <TouchableOpacity onPress={() => tag.addTag(name)}>
                <Icon name="add" style={styles.icon}/>
            </TouchableOpacity>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "white",
        // marginTop: 25,
        // marginBottom: 20,
    },
    textInput: {
        paddingLeft: 8,
        height: 45,
        borderRadius: 10,
        fontSize: 20,
        color: "#03045e",
        width: "75%",
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    icon: {
        fontSize: 43,
        color: "#48cae4",
        lineHeight: 45,
    },
})

export default SettingsFooter;