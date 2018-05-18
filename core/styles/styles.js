// Base style class
import { StyleSheet } from 'react-native';
import Color from 'react-native-material-color';
// import Color from 'react-native-material-color';

export const COLOR_PRIMARY = Color.CYAN[500];
export const COLOR_PRIMARY_DARK = Color.CYAN[700];

const Styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFF',
  },
});

export default Styles;
