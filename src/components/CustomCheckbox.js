import React, { useState } from "react";
import {StyleSheet, Pressable, Text, View} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { onChange } from "react-native-reanimated";

export default function CustomCheckbox({ checked, onChange}) {

    function onPress() {
        onChange(!checked);
    }

    return (
        <Pressable 
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={onPress}>
            {checked && <Entypo name="check" size={20} color="white" />}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#48cae4',
        backgroundColor: 'transparent',
      },

      checkboxChecked: {
        backgroundColor: '#48cae4',
      },
})