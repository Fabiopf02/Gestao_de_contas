import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Logon, { IUser } from './pages/Logon';
import CardForm from './pages/CardForm';
import CardDetail from './pages/CardDetail';

type ParamList = {
  Logon: undefined;
  Home: {
    user: IUser;
    toggleTheme: () => void;
  };
  CardDetail: {
    id: string;
  };
  CardForm: {
    _id: string;
  };
};

export type RouteProps<RouteName extends keyof ParamList> = RouteProp<
  ParamList,
  RouteName
>;

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Logon"
        headerMode="screen"
        screenOptions={{ headerShown: false, animationEnabled: true }}
      >
        <Stack.Screen name="Logon" component={Logon} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CardForm" component={CardForm} />
        <Stack.Screen name="CardDetail" component={CardDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
