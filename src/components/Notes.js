import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';



class Notes extends Component {
  componentWillMount () {

  }

  handleSubmit (e, serializedForm) {
    let { addNote } = this.props;
    e.preventDefault();
    document.noteAdder.reset();
    addNote(serializedForm);
  }

  render () {
    let { resource } = this.props;
    console.log('resource:', resource);
    return (
      <div>
        <Form size='huge' name='noteAdder' onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths='equal'>
            <Form.Input label='Title' name='title' placeholder='Note Title' />
            <Form.Input label='Reference Point' name='referencePoint' placeholder='Ex. Pg. 21, Time Code 3:10' />
          </Form.Group>
          <Form.TextArea label='About' name='notes' placeholder='Add Notes' rows='3' />
          <Form.Button inverted color='green' primary size='huge'>Add Note</Form.Button>
        </Form>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  resource: state.currentResource
});

let mapDispatchToProps = (dispatch) => ({
  addNote(note){
    console.log('note:', note);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
