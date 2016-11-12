import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon, Popup, Header, Image, Modal, Input, Form  } from 'semantic-ui-react';
import TopicModal from './TopicModal';
import { browserHistory } from 'react-router';
import moment from 'moment';

import * as TopicActions from '../actions/TopicActions';

class TopicList extends Component {
  constructor () {
    super();
    this.state = {
      open: false,
      modal: {},
    };

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sorter = this.sorter.bind(this);
    this.handleSearcher = this.handleSearcher.bind(this);
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
    let { editTopic } = this.props;
    e.preventDefault();
    serializedForm._id = id;
    this.setState({ open: false });
    editTopic(serializedForm);
  }

  done (_id) {
    let { deleteTopic } = this.props;
    deleteTopic(_id);
  }

  show (dimmer, cur) {
    this.setState({ dimmer, open: true, modal: cur });
  }

  close () {
    this.setState({ open: false });
  }

  goToResources (topic) {
    console.log('topic: ', topic);
    this.props.setCurrentTopic(topic._id);
    browserHistory.push(`/topic/${topic._id}`);
  }

  render () {
    let { topics } = this.props;
    console.log('topics:', topics);
    let { sort, search } = this.state;
    let tempRead = [...topics];
    let sorted;
    if (sort === 'Name') {
      sorted = tempRead.sort((a, b) => {
        let a1 = a.name.toLowerCase();
        let b1 = b.name.toLowerCase();
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
    }
    if (!sort && !search) sorted = topics;
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
              <Table.HeaderCell className='headerRow' onClick={this.sorter}>Topic Name</Table.HeaderCell>
              <Table.HeaderCell className='headerRow' onClick={this.sorter}>Created</Table.HeaderCell>
              <Table.HeaderCell >Last Updated</Table.HeaderCell>
              <Table.HeaderCell width='2'>Total Resources</Table.HeaderCell>
              <Table.HeaderCell width='2'>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sorted.map((cur, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell onClick={this.goToResources.bind(this, cur)}>{cur.name}</Table.Cell>
                  <Table.Cell width='2'>{moment(cur.timestamp).format('lll')}</Table.Cell>
                  <Table.Cell width='2'>{moment(cur.lastUpdated).format('lll')}</Table.Cell>
                  <Table.Cell width='1'>{cur.resources.length.toString()}</Table.Cell>
                  <Table.Cell textAlign='left'>
                    <Button.Group icon>
                      <Button inverted size='huge' onClick={() => this.show('inverted', cur)}>
                        <Icon color='blue' name='edit' />
                      </Button>
                      <Button inverted size='huge' onClick={this.done.bind(this, cur._id)}>
                        <Icon color='red' name='trash' />
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <TopicModal {...this.state} close={this.close} handle={this.handleSubmit} />
        </Table>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  topics: state.topics
});

let mapDispatchToProps = (dispatch) => ({
  editTopic (data) {
    dispatch(TopicActions.editTopic(data));
  },
  deleteTopic (_id) {
    dispatch(TopicActions.deleteTopic(_id));
  },
  setCurrentTopic (topicId) {
    dispatch(TopicActions.setCurrentTopic(topicId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
