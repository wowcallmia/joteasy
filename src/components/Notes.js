import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';



class Notes extends Component {
  componentWillMount () {
    this.props.fetchTopics();
  }

  handleSubmit (e, serializedForm) {
    let { addTopic } = this.props;
    e.preventDefault();
    document.adder.reset();
    // console.log('serializedForm: ', serializedForm);
    addTopic(serializedForm);
  }

  render () {
    return (
      <div>
        <Form size='huge' name='adder' onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group size='huge' widths='equal'>
            <Form.Input name='name' placeholder='Descriptive Title' />
          </Form.Group>
          <Button inverted color='blue' primary size='huge' type='submit'>Add New Note</Button>
        </Form>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({

});

let mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
