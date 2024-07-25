import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import ActivityDetails from "../screens/ActivityDetails";
import DietDetails from "../screens/DietDetails";

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ActivityDetails"
            component={ActivityDetails}
            options={{ title: "Activity Details" }}
        />
        <Stack.Screen
            name="DietDetails"
            component={DietDetails}
            options={{ title: "Diet Details" }}
        />
        </Stack.Navigator>
    );
};

export default RootStackNavigator;