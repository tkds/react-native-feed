import React from 'react';
import { WebView } from 'react-native';

export default class WebViewScreen extends React.Component {
  static navigationOptions = {
    title: 'WebView',
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <WebView source={{uri: params.url}} />
    );
  }
}