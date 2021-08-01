import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import ReminderDetail from "../components/ReminderDetail";
import { Context as ReminderContext } from "../context/ReminderContext";
import ReminderHeader from "../components/ReminderHeader";
import ReminderFooter from "../components/ReminderFooter";

const Reminders = () => {
    const reminder = useContext(ReminderContext);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        console.log("Use effect reminders ran okay!")
        reminder.getReminders();
      }, []);

    const handleOnPress = () => {
        if (showCompleted) {
            setShowCompleted(false);
        } else {
            setShowCompleted(true);
        }
        //BELOW IS FOR TESTING ONLY!
        reminder.getReminders();
    }

    return (
        <View style={styles.container}>
            <View style={{width: "94%"}}>
            <FlatList
                data={reminder.state.sort((a, b) => a["Date"].localeCompare(b["Date"]))}
                ListHeaderComponent={ReminderHeader}
                ListFooterComponent={() =>
                    <TouchableOpacity onPress={handleOnPress}>
                        <ReminderFooter
                            showCompleted={showCompleted}
                        />
                    </TouchableOpacity> 
                }
                keyExtractor={(item, index) => item.ID.toString()}
                renderItem={({ item }) => {
                        return (
                            !item["Complete"] || !showCompleted ? <ReminderDetail
                                key={item["ID"]}
                                ID={item["ID"]}
                                date={item["Date"]}
                                description={item["Description"]}
                                done={item["Complete"]}
                            /> : null
                        )
                    }}
                />
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