import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import ReminderDetail from "../components/ReminderDetail";
import Icon from "../components/Icon";
import { Context } from "../context/ReminderContext"

const Reminders = () => {
    const { state, addReminder, getReminders } = useContext(Context)

    const [newDescription, setNewDescription] = useState("");
    const [newDate, setNewDate] = useState("");

    useEffect(() => {
        console.log("Use effect reminders ran okay!")
        getReminders();
      }, []);

    return (
        <View style={styles.container}>
            <View style={{width: "94%", paddingTop: 10}}>
            <FlatList
                data={state}
                keyExtrator={( item ) => item["ID"].toString()}
                renderItem={({ item }) => {
                        return (
                            <ReminderDetail
                                date={item["Date"].substring(2).replaceAll("-", "/")}
                                description={item["Description"]}
                                done={item["Complete"]}
                            />
                        )
                    }}
                />
            <View style={{flexDirection: "row", paddingTop: 10}}>
                <TextInput 
                    placeholder="DD/MM/YY" 
                    placeholderTextColor="#b7b7b7"
                    textAlign={"center"}
                    value={newDate}
                    onChangeText={text => setNewDate(text)}
                    style={{marginRight: 7, flex: 1, paddingHorizontal: 5, paddingVertical: 10, backgroundColor: "#efefef", borderRadius: 10, color: "#03045e"}}
                />

                <TextInput 
                    placeholder="Your reminder ..." 
                    placeholderTextColor="#b7b7b7"
                    value={newDescription}
                    onChangeText={text => setNewDescription(text)}
                    style={{marginRight: 7, flex: 1.75, paddingHorizontal: 5, paddingVertical: 10, backgroundColor: "#efefef", borderRadius: 10, color: "#03045e"}}              
                />
                <TouchableOpacity style={{flex: .5}} onPress={() => {addReminder(newDescription, newDate), getReminders()}}>
                    <Icon name="add" style={{fontSize: 34, color: "#48cae4"}}/>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}     

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
})

export default Reminders;



// const remindersArray = [
//     {id: "1", date: "TODAY", description: "Cancel free trial", done: false},
//     {id: "2", date: "01/08/21", description: "Insurance review", done: false}
// ]