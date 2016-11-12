import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, TextArea, Container } from 'semantic-ui-react';
import * as NotesActions from '../actions/NotesActions';
import NotesList from './NotesList';

class Notes extends Component {
  componentWillMount () {
    let { resource, fetchNotes } = this.props;
    console.log('resource._id:', resource._id);
    fetchNotes(resource._id);
  }

  handleSubmit (e, serializedForm) {
    let { addNote } = this.props;
    e.preventDefault();
    document.noteAdder.reset();
    addNote(serializedForm, this.props.params.id);
  }

  render () {
    let { resource } = this.props;
    console.log('resource:', resource);
    return (
      <Container>
        <Form size='huge' name='noteAdder' onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths='equal'>
            <Form.Input label='Title' name='name' placeholder='Note Title' />
            <Form.Input label='Reference Point' name='refPoint' placeholder='Ex. Pg. 21, Time Code 3:10' />
          </Form.Group>
          <Form.TextArea label='About' name='text' placeholder='Add Notes' rows='3' />
          <Form.Button inverted color='green' primary size='huge'>Add Note</Form.Button>
        </Form>
        <NotesList />
      </Container>
    );
  }
}

let mapStateToProps = (state) => ({
  resource: state.currentResource
});

let mapDispatchToProps = (dispatch) => ({
  addNote (note, id) {
    dispatch(NotesActions.addNote(note, id));
  },

  fetchNotes (resourceId) {
    dispatch(NotesActions.fetchNotes(resourceId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
