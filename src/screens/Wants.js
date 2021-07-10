import React, {useState} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import NeedWantGoalList from "../components/NeedWantGoalList";
import NeedWantGoalFooter from "../components/NeedWantGoalFooter";

const Wants = () => {

    const [transactions, setTransactions] = useState([
        { key: "1", date: "11/06", description: "Uber Eats", amount: "£63.25", tag: "Takea..." },
        { key: "2", date: "07/06", description: "No descrip...", amount: "£15.75", tag: "Takea..." },
        { key: "3", date: "06/06", description: "John Lewis", amount: "£58.25", tag: "Shopp..." },
        { key: "4", date: "01/06", description: "Gym", amount: "£45.00", tag: "Hobbies" },
    ]);

    return (
        <View style={styles.container}>
            <View style={{width: "94%", height: "100%"}} >
                <FlatList
                    data={transactions}
                    ListHeaderComponent={() => <NeedWantGoalHeader 
                        title="WANTS"
                        remaining="£250.00"
                        spent="£140.00"
                        total="£390.00"
                        percent="35.9%"
                        barColor="#1489cc"
                    />
                    }
                    ListFooterComponent={NeedWantGoalFooter}

                    keyExtrator={( item, index ) => item.key}
                    renderItem={({ item, index }) => (
                        <NeedWantGoalList
                            date={item.date}
                            description={item.description}
                            amount={item.amount}
                            tag={item.tag}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flex: 1,
    },
});

export default Wants;