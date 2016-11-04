import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';
import ResourcesList from './ResourcesList';
import uuid from 'uuid';

import * as ResourcesActions from '../actions/ResourcesActions';

class Resources extends Component {

  componentWillMount () {
    this.props.fetchResources(this.props.currentTopic);
  }


  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
  }


  handleSubmit (e, serializedForm) {
    let { addRead, currentTopic } = this.props;
    e.preventDefault();
    document.adder.reset();
    // console.log('serializedForm: ', serializedForm);
    // console.log('currentTopic: ', currentTopic);
    addRead(serializedForm, currentTopic);
  }

  render () {
    const type = [
      { text: 'Video', value: 'Video', key: 'Video' },
      { text: 'Book', value: 'Book', key: 'Book' },
      { text: 'Website', value: 'Website', key: 'Website' }
    ];
    return (
      <div>
        <Form size='huge' name='adder' onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group size='huge' widths='equal'>
            <Form.Input name='name' placeholder='Descriptive Title' />
            <Form.Select name='type' options={type} placeholder='Type' />
            <Form.Input name='source' placeholder='SRC' />
          </Form.Group>
          <Button inverted color='blue' primary size='huge' type='submit'>Add New Resource</Button>
        </Form>
        <ResourcesList />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  resources: state.resources,
  currentTopic: state.currentTopic
});

let mapDispatchToProps = (dispatch) => ({
  addRead (data, currTopic) {
    dispatch(ResourcesActions.addRead(data, currTopic));
  },

  fetchResources (currTopicId) {
    dispatch(ResourcesActions.fetchResources(currTopicId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
