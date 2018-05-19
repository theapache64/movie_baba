// @flow

import React from 'react';
import Color from 'react-native-material-color';
import TagInput from 'react-native-tag-input';
import {
    ActivityIndicator,
    Alert,
    Platform,
    StatusBar,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import BaseContainer from '../widgets/BaseContainer';
import * as Styles from '../styles/styles';
import * as SearchResponse from '../api/SearchResponse';


const horizontalInputProps = {
    keyboardType: 'default',
    returnKeyType: 'search',
    placeholder: 'Keyword',
    placeholderTextColor: Color.WHITE,
    marginTop: 3,
    style: {
        color: 'white',
        fontSize: 16,
        marginVertical: Platform.OS === 'ios' ? 10 : -10,
    },
};
type PropType = {
    navigation: Object,
}
type StateType = {
    keywords: Array<string>,
    text: string,
    isLoading: boolean
}
export default class HomeVC extends React.Component<PropType, StateType> {
    static navigationOptions = {
        header: null,
    };


    constructor(props: PropType) {
        super(props);
        this.state = {
            keywords: ['Tony Stark'],
            text: '',
            isLoading: false,
        };

        (this: any).onGuessPressed = this.onGuessPressed.bind(this);
        (this: any).onKeywordChanged = this.onKeywordChanged.bind(this);
    }

    onChangeText = (text: string) => {
        this.setState({ text });

        const tagWhen = [',', '-', ';'];
        if (text.length > 1) {
            const lastTypedChar = text.charAt(text.length - 1);

            if (tagWhen.indexOf(lastTypedChar) !== -1) {
                // Cut tag here
                this.setState({
                    keywords: [...this.state.keywords, this.state.text],
                    text: '',
                });
            }
        }
    };

    onKeywordChanged(keywords: Array<string>) {
        console.log(`Keyword changed to ${keywords.toString()}`);
        this.setState({ keywords });
    }

    onGuessPressed() {
        // Getting movie data
        const { keywords, text } = this.state;
        if (text.length > 0) {
            keywords.push(this.state.text);
        }

        if (keywords.length > 0) {
            this.setState({
                isLoading: true,
            });


            fetch(`http://theapache64.com/movie_db/search?keyword=${encodeURIComponent(keywords.toString())}`)
                .then(resp => resp.json())
                .then((json) => {
                    const response = SearchResponse.parseSearch(json);
                    this.setState({
                        isLoading: false,
                    });

                    if (response.error !== true) {
                        // Clearing old data
                        this.setState({ keywords: [], text: '' });

                        this.props.navigation.navigate('MovieVC', { movie: response.data });
                    } else {
                        Alert.alert('Error', response.message);
                    }
                })
                .catch((error) => {
                    alert(error);
                    this.setState({
                        isLoading: false,
                    });
                });
        } else {
            Alert.alert('Uh ho!', 'Please enter some keywords');
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                {/* Status bar */}
                <StatusBar
                    backgroundColor={Styles.COLOR_PRIMARY_DARK}
                    barStyle="light-content"
                />


                {/* Loading */}
                {
                    this.state.isLoading &&
                    <View style={{
                        flex: 1,
                        backgroundColor: Styles.COLOR_PRIMARY,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        <ActivityIndicator color={Color.WHITE} style={{ marginBottom: 20 }} size="large" />
                        <Text style={{ color: Color.WHITE }}>Baba is guessing...</Text>
                    </View>
                }

                {/* Container */}
                {
                    !this.state.isLoading && <BaseContainer style={{
                        backgroundColor: Styles.COLOR_PRIMARY,
                        flex: 1,
                        padding: 10,
                        justifyContent: 'center',
                    }}
                    >

                        {/* Input container */}
                        <View style={{
                            height: 54,
                            borderColor: '#fff',
                            borderWidth: 1,
                            marginBottom: 10,
                            borderRadius: 5,
                            backgroundColor: 'transparent',
                        }}
                        >
                            <TagInput
                                value={this.state.keywords}
                                onChange={arr => this.onKeywordChanged(arr)}
                                labelExtractor={tag => tag}
                                text={this.state.text}
                                onChangeText={this.onChangeText}
                                inputColor={Color.WHITE}
                                tagColor={Styles.COLOR_PRIMARY_DARK}
                                tagContainerStyle={{ marginLeft: 5, height: 35 }}
                                tagTextColor={Color.WHITE}
                                inputProps={horizontalInputProps}
                                scrollViewProps={{
                                    horizontal: true,
                                    showsHorizontalScrollIndicator: false,
                                }}
                            />


                        </View>

                        <TouchableHighlight
                            underlayColor={Styles.COLOR_PRIMARY_DARK}
                            onPress={this.onGuessPressed}
                            style={{
                                borderColor: '#fff',
                                borderWidth: 1,
                                marginBottom: 10,
                                borderRadius: 5,
                                padding: 10,
                                backgroundColor: Styles.COLOR_PRIMARY,
                            }}
                        >
                            <Text style={{
                                textAlign: 'center',
                                color: Color.WHITE,
                            }}
                            >
                                GUESS!!
                            </Text>
                        </TouchableHighlight>


                                             </BaseContainer>
                }

            </View>
        );
    }
}
