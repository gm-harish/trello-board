import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const FormModal = ({show, onSubmit, onClose, isList}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const descBlock = !isList ? (
    <Form.Group>
      <Form.Label> description</Form.Label>
      <Form.Control
        required
        value={desc}
        type="text"
        placeholder="Enter Desc"
        onChange={(e) => setDesc(e.target.value)}
      />
    </Form.Group>
  ) : (
    ''
  );

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label> Title {isList}</Form.Label>
            <Form.Control
              value={title}
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          {descBlock}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            isList ? onSubmit(title) : onSubmit(title, desc);
          }}
        >
          submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
