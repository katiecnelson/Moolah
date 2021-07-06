import React, {useState} from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import NeedWantGoalScreen from "./NeedWantGoalScreen";
import NeedWantGoalList from "./NeedWantGoalList";
import Icon from "./Icon";

const Goals = () => {

    const [transactions, setTransactions] = useState([
        { key: "1", date: "12/06", description: "Scottish P...", amount: "£63.25", tag: "Utilities" },
        { key: "2", date: "10/06", description: "Glasgow", amount: "£65.75", tag: "Utilities" },
        { key: "3", date: "04/06", description: "Tesco", amount: "£21.50", tag: "Food" },
        { key: "4", date: "02/06", description: "Sainsbury’s", amount: "£12.00", tag: "Food" },
    ]);

    return (
        <View style={styles.container}>
            <View style={{width: "94%"}} >
            <NeedWantGoalScreen
                    title="GOALS"
                    remaining="£165.00"
                    spent="£95.00"
                    total="£165.00"
                    percent="36.5%"
                    barColor="#024f86"
                />
                        <FlatList
                            data={transactions}
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
                <View style={{alignItems: "center"}}>
                    <Icon name="history" style={{color: "#03045e", fontSize: 28, paddingTop: 20}}/>
                    <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>PAST DATA</Text>
                </View>
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

export default Goals;