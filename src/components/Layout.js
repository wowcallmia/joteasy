import React, { Component } from 'react';
import Resources from './Resources';
import Topics from './Topics';
import { Header, Segment, Icon } from 'semantic-ui-react';

export default class Layout extends Component {
  render () {
    return (
      <Segment inverted>
        <Header inverted as='h2' color='blue' icon textAlign='center'>
          <Icon name='book' circular />
          <Header.Content>
            JotEasy
          </Header.Content>
        </Header>
        {this.props.children}
        {/* <Topics />
        <Resources /> */}
      </Segment>
    );
  }
}
