import React, { Component } from 'react';
import { Button, Icon, Header, Image, Modal, Form } from 'semantic-ui-react';

export default class TopicModal extends Component {

  render () {
    let { read, open, dimmer, close, modal, handle } = this.props;
    return (
        <Modal dimmer={dimmer} open={open} onClose={close}>
          <Modal.Header>Topic Editor</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Update Name</Header>
              <Form size='huge' onSubmit={handle.bind(null, modal._id)}>
                <Form.Group size='huge' widths='equal'>
                  <Form.Input label='Name' defaultValue={modal.name} name='name' placeholder='Descriptive Title' />
                </Form.Group>
                <Button inverted color='blue' primary size='huge' type='submit'>Update</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
  }
}
