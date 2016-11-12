import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import TopicList from './TopicList';

import * as TopicActions from '../actions/TopicActions';

class Topic extends Component {
  componentWillMount () {
    this.props.fetchTopics();
  }

  handleSubmit (e, serializedForm) {
    let { addTopic } = this.props;
    console.log('addTopic:', addTopic);
    e.preventDefault();
    document.adder.reset();
    addTopic(serializedForm);
  }

  render () {
    let { topics } = this.props;
    console.log('topics:', topics);
    return (
      <div>
        <Form size='huge' name='adder' onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group size='huge' widths='equal'>
            <Form.Input name='name' placeholder='Descriptive Title' />
          </Form.Group>
          <Button inverted color='blue' primary size='huge' type='submit'>Add New Topic</Button>
        </Form>
        <TopicList />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  topics: state.topics
});

let mapDispatchToProps = (dispatch) => ({
  addTopic (data) {
    dispatch(TopicActions.addTopic(data));
  },

  fetchTopics () {
    dispatch(TopicActions.fetchTopics());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
