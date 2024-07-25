import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
        />
        </Stack.Navigator>
    );
};

export default RootStackNavigator;