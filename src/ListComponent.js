import React, {useState} from 'react';
import {connect} from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {removeList, addCard} from './app/redux/listActions';
import CardComponent from './cardComponent';
import FormModal from './formModal';
import './ListComponet.css';
import {Droppable, Draggable} from 'react-beautiful-dnd';

const ListComponent = (props) => {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);
  const onSubmit = (title, desc) => {
    if (title && desc) {
      props.dispatch(addCard(props.listIndex, title, desc));
    }
    onClose();
  };
  const isList = false;

  return (
    <div>
      <Card className="CardCss">
        <Card.Header>
          {props.list.name}
          <Button
            className="removeButtonCss"
            variant="primary"
            size="sm"
            onClick={() => {
              props.dispatch(removeList(props.listIndex));
            }}
          >
            Remove List
          </Button>
        </Card.Header>
        <Card.Body>
          <Droppable droppableId={'droppable-' + props.listIndex}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {props.list.children.map((child, index) => {
                  return (
                    <Draggable
                      draggableId={'draggable-' + child.id}
                      index={index}
                      key={child.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CardComponent
                            card={child}
                            cardIndex={index}
                            listIndex={props.listIndex}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add product
          </Button>
        </Card.Footer>
      </Card>
      <FormModal
        show={showModal}
        isList={isList}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default connect()(ListComponent);
