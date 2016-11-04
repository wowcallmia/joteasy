import React, { Component } from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

import { browserHistory } from 'react-router';
import Notes from './Notes';

export default class Layout extends Component {
  goHome () {
    browserHistory.push('/');
  }

  render () {
    return (
      <Segment inverted>
        <Header inverted as='h2' color='blue' icon textAlign='center'>
          <Icon name='book' onClick={this.goHome.bind(this)} circular />
          <Header.Content>
            JotEasy
          </Header.Content>
        </Header>
        {this.props.children}
      </Segment>
    );
  }
}
