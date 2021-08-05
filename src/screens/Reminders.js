import React, {useContext, useState} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import ReminderDetail from "../components/ReminderDetail";
import {Context as ReminderContext} from "../context/ReminderContext";
import ReminderHeader from "../components/ReminderHeader";
import ReminderFooter from "../components/ReminderFooter";
import {sortDescending} from "../utilities/helper";

const Reminders = () => {
    const reminder = useContext(ReminderContext);
    const [showCompleted, setShowCompleted] = useState(false);

    const handleOnPress = () => {
        if (showCompleted) {
            setShowCompleted(false);
        } else {
            setShowCompleted(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <FlatList
                data={sortDescending(reminder.state, "Date")}
                ListHeaderComponent={ReminderHeader}
                ListFooterComponent={() =>
                    <TouchableOpacity onPress={handleOnPress}>
                        <ReminderFooter
                            showCompleted={showCompleted}
                        />
                    </TouchableOpacity> 
                }
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({item}) => {
                        return (
                            !item["Complete"] || !showCompleted
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