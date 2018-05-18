// @flow
import React from 'react';
import {Image, Text, View, StyleSheet, ImageBackground, Button, TouchableHighlight} from 'react-native';
import type {Movie} from '../models/Movie';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import * as Colors from 'react-native-material-color';
import {COLOR_PRIMARY, COLOR_PRIMARY_DARK} from '../styles/styles';

type PropTypes = {
    movie: Movie,
    navigation: Object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class MovieScreen extends React.Component<PropTypes> {
    static navigationOptions = {
        header: null,
    };

    render() {
        // const movie = this.props.navigation.state.params.movie;
        return (
            <ImageBackground
                style={styles.container}
                source={require('../assets/images/black_panther.jpg')}
            >
                <View
                    style={[styles.container, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}
                >
                    {/*Desciption*/}
                    <View style={{flexDirection: 'row'}}>

                        {/* Poster */}
                        <Image
                            style={{
                                width: 150,
                                height: 210,
                                margin: 10,
                                backgroundColor: 'transparent',
                                resizeMode: Image.resizeMode.contain,
                            }}
                            source={require('../assets/images/black_panther.jpg')}
                        />

                        {/* Other details */}
                        <View style={{
                            flex: 1,
                            marginTop: 6,
                            marginEnd: 5,
                            height: 210,
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                        }}
                        >

                            {/* Title */}
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Black Panther</Text>

                            {/* Genree */}
                            <Text style={{color: 'white'}}>Action, Drama</Text>

                            {/* Rating */}
                            <Text style={{color: 'white', marginTop: 10, marginBottom: 6}}>
                                <FontAwesome
                                    style={{color: Colors.YELLOW[500]}}
                                >{Icons.star}
                                </FontAwesome> 5.6
                            </Text>

                            {/*Directed by*/}
                            <Text style={{color: 'white', marginBottom:5}}>Directed by : Shifar</Text>


                            <View style={{flex:1,flexDirection: 'row',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                <TouchableHighlight
                                    style={{padding: 4, paddingEnd:10,paddingLeft:10,borderRadius:5, backgroundColor: COLOR_PRIMARY}}
                                    onPress={this.onViewDetails}
                                    underlayColor={COLOR_PRIMARY_DARK}
                                >
                                    <Text style={{color: 'white'}}>View Details</Text>
                                </TouchableHighlight>
                            </View>



                        </View>


                    </View>


                    <View>
                        <Text style={{color:'white', backgroundColor:'red'}}>Hello</Text>
                    </View>



                </View>
            </ImageBackground>
        );
    }

    onViewDetails = () => {

    }
}
