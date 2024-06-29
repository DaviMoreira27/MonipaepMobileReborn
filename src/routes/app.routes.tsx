import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HealthConditions } from "../pages/HealthConditions";
import colors from "../styles/colors";
import { Login, SignUp, Symptoms } from "../pages";
import { Home } from "../pages/Home";
import { ConditionInsert } from "../pages/ConditionInsert";
import { MyAppointments } from "../pages/MyAppointments";

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      headerShown: false,
    }}
  >
    <AppStack.Screen name="HealthConditions" component={HealthConditions} />
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="SignUp" component={SignUp} />
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="Symptoms" component={Symptoms} />
    <AppStack.Screen name="ConditionInsert" component={ConditionInsert} />
    <AppStack.Screen name="MyAppointments" component={MyAppointments} />
  </AppStack.Navigator>
);

export default AppRoutes;
