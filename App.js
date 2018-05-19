/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SplashVC from './core/views/SplashVC';
import HomeVC from './core/views/HomeVC';
import MovieVC from './core/views/MovieVC';


const StackRoot = createStackNavigator({
    // SplashVC screen
    Splash: {
        screen: SplashVC,
        navigationOptions: {
            header: null,
        },
    },

    // HomeVC screen
    HomeVC: {
        screen: HomeVC,
    },

    // MovieVC
    MovieVC: {
        screen: MovieVC,
    },

}, {
    initialRouteName: 'Splash',
});

const App = () => <StackRoot />;
export default App;
