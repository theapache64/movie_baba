import React from 'react';
import BaseContainer from '../widgets/BaseContainer';
import * as Styles from '../styles/styles';
import Color from 'react-native-material-color';
import TagInput from 'react-native-tag-input';
import { ActivityIndicator, Platform, StatusBar, Text, TouchableHighlight, View } from 'react-native';
import * as SearchResponse from '../api/SearchResponse';


const horizontalInputProps = {
    keyboardType: 'default',
    returnKeyType: 'search',
    placeholder: 'Keyword',
    placeholderTextColor: Color.WHITE,
    marginTop: 3,
    style: {
        fontSize: 16,
        marginVertical: Platform.OS === 'ios' ? 10 : -10,
    },
};
type PropType = {}
type StateType = {
    keywords: Array<string>,
    text: string,
    isLoading: boolean,
    loadingMessage: string
}
export default class HomeVC extends React.Component<PropType, StateType> {
    static navigationOptions = {
        header: null,
    };
    onChangeText = (text: string) => {
        this.setState({ text });

        const tagWhen = [',', '-', ' ', ';'];
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

    constructor(props: PropType) {
        super(props);
        this.state = {
            keywords: ['Ironman', 'Superman', 'Spiderman'],
            text: '',
            isLoading: false,
            loadingMessage: 'Let me guess!! ',
        };
        this.onGuessPressed = this.onGuessPressed.bind(this);
        this.onKeywordChanged = this.onKeywordChanged.bind(this);
    }

    onKeywordChanged(keywords: Array<string>) {
        console.log(`Keyword changed to ${keywords.toString()}`);
        this.setState({ keywords });
    }

    onGuessPressed() {
        this.setState({
            isLoading: true,
        });

        // Getting movie data
        const { keywords } = this.state;

        fetch(`http://theapache64.com/movie_db/search?keyword=${encodeURIComponent(keywords)}`)
            .then(resp => resp.json())
            .then((json) => {
                const response = SearchResponse.parseSearch(json);
                this.setState({
                    isLoading: false,
                });
                this.props.navigation.navigate('MovieVC', { movie: response.data });
            })
            .catch((error) => {
                alert(error);
                this.setState({
                    isLoading: false,
                });
            });
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
                        <Text style={{ color: Color.WHITE }}>Guessing</Text>
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
                                onChange={this.onKeywordChanged}
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
