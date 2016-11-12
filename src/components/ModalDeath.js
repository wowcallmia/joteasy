import React, { Component } from 'react';
import { Button, Icon, Header, Image, Modal, Form } from 'semantic-ui-react';

export default class ModalDeath extends Component {

  render () {
    // const type = [
    //   { text: 'Video', value: 'Video', key: 'Video' },
    //   { text: 'Book', value: 'Book', key: 'Book' },
    //   { text: 'Website', value: 'Website', key: 'Website' }
    // ];
    let { read, open, dimmer, close, modal, handle } = this.props;
    // console.log(this.props);
    return (
        <Modal dimmer={dimmer} open={open} onClose={close}>
          <Modal.Header>Resource Editor</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Update Anything</Header>
              <Form size='huge' onSubmit={handle.bind(null, modal._id)}>
                <Form.Group size='huge' widths='equal'>
                  <Form.Input label='Name' defaultValue={modal.name} name='name' placeholder='Descriptive Title' />
                  <Form.Input label='Text' defaultValue={modal.text} name='text' placeholder='Descriptive Title' />
                  <Form.Input label='Reference' defaultValue={modal.refPoint} name='refPoint' placeholder='Descriptive Title' />
                  {/* <Form.Select label='Type' name='type' defaultValue={modal.type} options={type} placeholder='Must Read ASAP' /> */}
                  {/* <Form.Input label='SRC' name='src' placeholder='SRC Link' defaultValue={modal.source} /> */}
                </Form.Group>
                <Button inverted color='blue' primary size='huge' type='submit'>Update</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
  }
}
