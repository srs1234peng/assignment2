import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import Setting from '../screens/Setting';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
                tabBarStyle: { backgroundColor: colors.background },
            }}
            >
            {/* <Tab.Screen
                name="Activities"
                component={ActivitiesScreen}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="directions-run" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Diet"
                component={DietScreen}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="restaurant" color={color} size={size} />,
                }}
            /> */}
            <Tab.Screen
                name="Settings"
                component={Setting}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="settings" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;