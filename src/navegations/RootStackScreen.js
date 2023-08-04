import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screen/splash/SplashScreen';
import HomeScreen from '../screen/home/HomeScreen';
import TragosRandomScreen from '../screen/participantes/TragosRandomScreen';
import ParticipantesScreen from '../screen/participantes/ParticipantesScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator initialRouteName="HomeScreen">
        <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown: true,
                title: 'Bienvenido',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="TragosRandomScreen"
            component={TragosRandomScreen}
            options={{
                headerShown: true,
                title: 'Tragos Random',
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                //ocultar boton regresar en ios
                // headerBackVisible: false,
            }}
        />
          <RootStack.Screen
            name="ParticipantesScreen"
            component={ParticipantesScreen}
            options={{
                headerShown: true,
                title: 'Participantes',
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                //ocultar boton regresar en ios
                // headerBackVisible: false,
            }}
        />
    </RootStack.Navigator>
);

export default RootStackScreen;
