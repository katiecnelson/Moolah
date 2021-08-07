import React, {useState, useContext} from "react";
import {View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import { Context as TagContext } from "../context/TagContext";
import Toast from "./Toast";

const AddTag = (props) => {
    const tag = useContext(TagContext);
    const [name, setName] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleOnPress = () => {
        if (name === "" || 
            tag.state.find(e => e["Name"].toLowerCase() === name.toLowerCase())) {
            setShowToast(true);
        } else {
            tag.addTag(name);
            setName("");
        }
    };

    return (
        <View>
            <Toast
                show={showToast}
                onRequestClose={() => setShowToast(false)}
                text="Please input a text for the tag. Tags must be unique."
                onPress={() => setShowToast(false)}
            />
            <View style={[styles.flex, props.styling]}>
                <TextInput
                    value={name}
                    maxLength={15}
                    placeholder={props.text}
                    placeholderTextColor="#b7b7b7"
                    style={{...styles.textInput, backgroundColor: props.color}}
                    onChangeText={text => setName(text)}
                />
                <TouchableOpacity onPress={handleOnPress}>
                    <Icon name="add" style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textInput: {
        paddingLeft: 8,
        height: 45,
        borderRadius: 10,
        fontSize: 20,
        color: "#03045e",
        width: "75%",
    },
    icon: {
        fontSize: 43,
        color: "#48cae4",
        lineHeight: 45,
    },
});

export default AddTag;