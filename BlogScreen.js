import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List, ListItem } from 'native-base';
import styles from './style';

class WPPost {
  constructor(post) {
    this.post = post;
    this.title = post.title;
    this.date = post.date;
    this.excerpt = post.excerpt;
    this.url = post.permalink;
    this.thumbnail = this.getThumbnail();
  }

  getThumbnail() {
    var wpfm = this.post.assets[0];
    if (wpfm != undefined) {
      return wpfm.url;
    } else {
      return 'https://placehold.jp/240x240.png';
    }
  }
}

export default class BlogScreen extends React.Component {
  static navigationOptions = {
    title: 'Movable Type.jp',
  };

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    fetch('https://www.movabletype.jp/mt/mt-data-api.cgi/v3/sites/1/entries')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson.items));
        for(var i in responseJson.items) {
          var p = new WPPost(responseJson.items[i]);
          this.setState({ items: this.state.items.concat([p]) })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openUrl(url) {
    this.props.navigation.navigate('WebView', { url: url })
  }



  render() {
    var items = this.state.items;
    return (
      <Container>
        <Content>
        <List
        dataArray={items}
          renderRow={item =>
          <Card style={{flex: 0}} onPress={() => {this.openUrl(item.url)}}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: item.thumbnail }} />
                <Body onPress={() => {this.openUrl(item.url)}}>
                  <Text onPress={() => {this.openUrl(item.url)}}>{item.title}</Text>
                  <Text note>{item.date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem onPress={() => {this.openUrl(item.url)}}>
              <Body>
                <Image source={{ uri: item.thumbnail }} style={styles.imageStyle} />
                <Text>
                  {item.excerpt}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        }>
          </List>
        </Content>
      </Container>
    );
  }

}