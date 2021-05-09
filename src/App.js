import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {addList, dragDropCard} from './app/redux/listActions';
import ListComponent from './ListComponent';
import FormModal from './formModal';
import {savedState} from './local-storage';
import {store} from './index';
import {DragDropContext} from 'react-beautiful-dnd';

const styles = {
  navPaneCss: {
    padding: '10px',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
};

function App(props) {
  const [showModal, setShowModal] = useState(false);

  const handler = () => {
    console.log(store.getState());
    savedState(store.getState());
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, []);

  const onClose = () => setShowModal(false);
  const onSubmit = (name) => {
    if (name) {
      props.dispatch(addList(name));
    }
    onClose();
  };
  const isList = true;

  const onDragEnd = useCallback((e) => {
    if (e.destination) {
      const sourceListIndex = e.source.droppableId.replace('droppable-', '');
      const sourceListChildId = e.draggableId.replace('draggable-', '');
      const destinationListIndex = e.destination.droppableId.replace(
        'droppable-',
        ''
      );
      props.dispatch(
        dragDropCard(sourceListChildId, sourceListIndex, destinationListIndex)
      );
    }
  }, []);

  return (
    <div>
      <Navbar style={styles.navPaneCss} bg="dark" variant="dark">
        <Navbar.Brand>Trello</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add list
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={styles.listContainer}>
          {props.listItems.map((list, index) => {
            return (
              <ListComponent list={list} listIndex={index} key={list.id} />
            );
          })}
        </div>
      </DragDropContext>
      <FormModal
        show={showModal}
        isList={isList}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listItems: state.lists,
  };
};

export default connect(mapStateToProps)(App);
