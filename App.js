import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import BlogScreen from './BlogScreen';
import WebViewScreen from './WebViewScreen';

const App = StackNavigator({
  Blog: { screen: BlogScreen },
  WebView: { screen: WebViewScreen },
});

AppRegistry.registerComponent('App', () => App);

export default App;