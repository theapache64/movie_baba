import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import BaseContainer from '../widgets/BaseContainer';

const logo = require('../assets/images/ic_logo.png');

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

type PropType = {};
export default class SplashVC extends React.Component<PropType> {
    componentDidMount() {
        // Starting splash timer
        setTimeout(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'HomeVC',
                    }),
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }, 1500);
    }

    render() {
        return (
            <BaseContainer style={styles.body} navigation={this.props.navigation}>
                <Image
                    style={{
                        width: 150,
                        height: 150,
                    }}
                    source={logo}
                />
            </BaseContainer>
        );
    }
}
