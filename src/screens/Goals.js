import React, {useState} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import NeedWantGoalList from "../components/NeedWantGoalList";
import NeedWantGoalFooter from "../components/NeedWantGoalFooter";

const Goals = () => {

    const [transactions, setTransactions] = useState([
        { key: "1", date: "12/06", description: "RBS Savi...", amount: "£63.25", tag: "Italy..." },
        { key: "2", date: "03/06", description: "Vanguard", amount: "£65.75", tag: "Retire..." },
    ]);

    return (
        <View style={styles.container}>
            <View style={{width: "94%", height: "100%"}} >
                <FlatList
                    data={transactions}
                    ListHeaderComponent={() => <NeedWantGoalHeader 
                        title="GOALS"
                        remaining="£165.00"
                        spent="£95.00"
                        total="£165.00"
                        percent="36.5%"
                        barColor="#024f86"
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

export default Goals;