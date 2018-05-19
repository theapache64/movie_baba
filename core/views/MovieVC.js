// @flow
import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity,
    Linking,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import * as Colors from 'react-native-material-color';
import type { Movie } from '../models/Movie';
import { COLOR_PRIMARY, COLOR_PRIMARY_DARK } from '../styles/styles';

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

    onViewDetails = () => {
        const { url } = this.props.navigation.state.params.movie;

        Linking.canOpenURL(url).then((isSup) => {
            if (isSup) {
                Linking.openURL(url);
            }
        }).catch(err => console.error('An error happened', err));
    };

    render() {
        const { movie } = this.props.navigation.state.params;
        return (
            <ImageBackground
                style={styles.container}
                source={{ uri: movie.poster_url }}
            >
                <View
                    style={[styles.container, { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
                >


                    {/* Desciption */}
                    <View style={{ flexDirection: 'row' }}>


                        {/* Poster */}
                        <Image
                            style={{
                                width: 150,
                                height: 210,
                                margin: 10,
                                backgroundColor: 'transparent',
                                resizeMode: Image.resizeMode.contain,
                            }}
                            source={{ uri: movie.poster_url }}
                        />

                        {/* Other details */}
                        <View style={{
                            flex: 1,
                            marginTop: 6,
                            marginEnd: 5,
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                        }}
                        >

                            {/* Title */}
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{movie.name}</Text>

                            {/* Genree */}
                            <Text style={{ color: 'white' }}>{movie.genre}</Text>

                            {/* Rating */}
                            <Text style={{ color: 'white', marginTop: 10, marginBottom: 6 }}>
                                <FontAwesome
                                    style={{ color: Colors.WHITE }}
                                >{Icons.users}
                                </FontAwesome> {movie.stars}
                            </Text>

                            {/* Year */}
                            <Text style={{ color: 'white', marginTop: 4, marginBottom: 6 }}>
                                <FontAwesome
                                    style={{ color: Colors.WHITE }}
                                >{Icons.calendar}
                                </FontAwesome> {movie.year}
                            </Text>

                            {/* Directed by */}
                            <Text style={{ color: 'white', marginBottom: 10 }}>Directed by : {movie.director}</Text>


                            {/* View details */}
                            <View style={{
                                flex: 1, flexDirection: 'column', alignItems: 'flex-start',
                            }}
                            >
                                <TouchableHighlight
                                    style={{
                                        padding: 4,
                                        paddingEnd: 10,
                                        paddingLeft: 10,
                                        borderRadius: 5,
                                        backgroundColor: COLOR_PRIMARY,
                                    }}
                                    onPress={this.onViewDetails}
                                    underlayColor={COLOR_PRIMARY_DARK}
                                >
                                    <Text style={{ color: 'white' }}>View Details</Text>
                                </TouchableHighlight>
                            </View>


                        </View>


                    </View>


                    <View style={{ margin: 10 }}>
                        <Text style={{
                            color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 10,
                        }}
                        >Plot
                        </Text>
                        <Text style={{ color: 'white' }}>
                            {movie.plot}
                        </Text>
                    </View>


                    <View style={{
                        flex: 1,
                        margin: 20,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                    >
                        <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <FontAwesome style={{ color: 'white', fontSize: 30 }}>{Icons.timesCircle}</FontAwesome>
                        </TouchableOpacity>
                    </View>


                </View>
            </ImageBackground>
        );
    }
}
