import React, {useContext, useState} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import ReminderDetail from "../components/ReminderDetail";
import {Context as ReminderContext} from "../context/ReminderContext";
import ReminderHeader from "../components/ReminderHeader";
import ReminderFooter from "../components/ReminderFooter";
import {sortAscending} from "../utilities/helper";

// Returns JSX for the Reminders screen and handles show/hide button

const Reminders = () => {
    const reminder = useContext(ReminderContext);
    const [hideCompleted, setHideCompleted] = useState(true);

    // Toggles showing/hiding the completed reminders
    const handleOnPress = () => {
        if (hideCompleted) {
            setHideCompleted(false);
        } else {
            setHideCompleted(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <FlatList
                data={sortAscending(reminder.state, "Date")}
                ListHeaderComponent={ReminderHeader}
                ListFooterComponent={() =>
                    <TouchableOpacity onPress={handleOnPress}>
                        <ReminderFooter
                            showCompleted={hideCompleted}
                        />
                    </TouchableOpacity> 
                }
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({item}) => {
                        return (
                            !item["Complete"] || !hideCompleted
                            ? <ReminderDetail
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    innerContainer: {
        width: "94%"
    }
});

export default Reminders;