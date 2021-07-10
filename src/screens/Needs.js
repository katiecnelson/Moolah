import React, {useState} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import NeedWantGoalHeader from "../components/NeedWantGoalHeader";
import NeedWantGoalList from "../components/NeedWantGoalList";
import NeedWantGoalFooter from "../components/NeedWantGoalFooter";

const Needs = () => {

    const [transactions, setTransactions] = useState([
        { key: "1", date: "12/06", description: "Scottish P...", amount: "£63.25", tag: "Utilities" },
        { key: "2", date: "10/06", description: "Glasgow", amount: "£65.75", tag: "Utilities" },
        { key: "3", date: "04/06", description: "Tesco", amount: "£21.50", tag: "Food" },
        { key: "4", date: "02/06", description: "Sainsbury’s", amount: "£12.00", tag: "Food" },
    ]);

    return (
        <View style={styles.container}>
            <View style={{width: "94%", height: "100%"}} >
                <FlatList
                    data={transactions}
                    ListHeaderComponent={() => <NeedWantGoalHeader 
                        title="NEEDS"
                        remaining="£487.50"
                        spent="£162.50"
                        total="£650.00"
                        percent="25%"
                        barColor="#9ce0ff" 
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
})

export default Needs;