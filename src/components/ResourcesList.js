import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon, Popup, Header, Image, Modal, Input, Form  } from 'semantic-ui-react';
import ModalLife from './ModalLife';

import * as ResourcesActions from '../actions/ResourcesActions';

class ReadingList extends Component {
  constructor () {
    super();
    this.state = {
      open: false,
      modal: {}
    };

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sorter = this.sorter.bind(this);
    this.handleSearcher = this.handleSearcher.bind(this);
    // this._onChange = this._onChange.bind(this);
  }

  handleSearcher (e, serializedForm) {
    e.preventDefault();
    this.setState({ search: serializedForm.searchEntry });
    document.searchForm.reset();
  }

  sorter (e) {
    console.log('sorting');
    this.setState({ sort: e.target.innerHTML });
  }

  handleSubmit (id, e, serializedForm) {
    let { editRead } = this.props;
    e.preventDefault();
    serializedForm.id = id;
    this.setState({ open: false });
    editRead(serializedForm);
  }

  deleteResource (_id) {
    let { deleteResource } = this.props;
    deleteResource(_id);
  }

  show (dimmer, cur) {
    this.setState({ dimmer, open: true, modal: cur });
  }

  close () {
    this.setState({ open: false });
  }

  render () {
    let { resources } = this.props;
    console.log('resources in list: ', resources);
    let { sort, search } = this.state;
    let tempRead = [...resources];
    let sorted;
    if (sort === 'Name') {
      sorted = tempRead.sort((a, b) => {
        let a1 = a.name.toLowerCase();
        let b1 = b.name.toLowerCase()
        if (a1 < b1) return -1;
        if (a1 > b1) return 1;
        return 0;
      });
    }
    if (sort === 'Importance') {
      sorted = tempRead.sort((a, b) => a.importance.split(' ')[1] - b.importance.split(' ')[1]);
    }
    if (search) {
      sorted = tempRead.filter((cur) => cur.name.toLowerCase().includes(search.toLowerCase()));
      console.log('sorted:', sorted);
    }
    if (!sort && !search) sorted = resources;

    return (
      <div>
        <Form size='huge' name='searchForm' className='searchForm' onSubmit={this.handleSearcher}>
          <Input name='searchEntry' inverted placeholder='Search...' />
          <Button inverted size='small' className='searcher' primary type='submit'>
            <Icon type='submit' name='search' inverted circular />
          </Button>
        </Form>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className='headerRow' onClick={this.sorter}>Name</Table.HeaderCell>
              <Table.HeaderCell className='headerRow' onClick={this.sorter}>Type</Table.HeaderCell>
              <Table.HeaderCell>SRC</Table.HeaderCell>
              <Table.HeaderCell>Last Updated</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>Total Notes</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sorted.map((cur, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell>{cur.name}</Table.Cell>
                  <Table.Cell>{cur.type}</Table.Cell>
                  <Table.Cell width='4'>{cur.source}</Table.Cell>
                  <Table.Cell width='2'>Nov. 01, 2016 12:40pm</Table.Cell>
                  <Table.Cell width='2'>Oct. 31, 2016 3:40pm</Table.Cell>
                  <Table.Cell width='1'>34</Table.Cell>
                  <Table.Cell textAlign='left'>
                    <Button.Group icon>
                      <Button inverted size='huge' onClick={() => this.show('inverted', cur)}>
                        <Icon color='blue' name='edit' />
                      </Button>
                      <Button inverted size='huge' onClick={this.deleteResource.bind(this, cur._id)}>
                        <Icon color='red' name='trash' />
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <ModalLife {...this.state} close={this.close} handle={this.handleSubmit} />
        </Table>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  resources: state.resources
});

let mapDispatchToProps = (dispatch) => ({
  editRead (data) {
    console.log('data:', data);
    dispatch(ResourcesActions.editRead(data));
  },
  deleteResource (id) {
    dispatch(ResourcesActions.deleteResource(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingList);
