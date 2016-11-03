import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';
import ResourcesList from './ResourcesList';
import uuid from 'uuid';

import * as ResourcesActions from '../actions/ResourcesActions';

class Resources extends Component {

  handleSubmit (e, serializedForm) {
    let { addRead } = this.props;
    e.preventDefault();
    document.adder.reset();
    addRead(serializedForm);
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
            <Form.Input name='src' placeholder='SRC' />
          </Form.Group>
          <Button inverted color='blue' primary size='huge' type='submit'>Add New Resource</Button>
        </Form>
        <ResourcesList />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({

});

let mapDispatchToProps = (dispatch) => ({
  addRead (data) {
    dispatch(ResourcesActions.addRead(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
