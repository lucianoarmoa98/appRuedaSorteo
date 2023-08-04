/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { MyApp } from './src/MyApp';


const App = () => {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyApp />
      </NavigationContainer>
    </Provider>


  );
}



export default App;
