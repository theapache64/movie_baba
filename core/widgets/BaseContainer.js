import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../styles/styles';

type PropType = {
    children: PropTypes.node,
    style: PropTypes.style
}
export default class BaseContainer extends Component<PropType> {
  render() {
    return (
      <View style={[Styles.body, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}
