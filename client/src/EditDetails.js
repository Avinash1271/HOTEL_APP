import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EditDetails = ({ detail, handleEdit }) => {
  const [name, setName] = useState(detail.name);
  const [userEmail, setUserEmail] = useState(detail.userEmail);
  const [roomNumber, setRoomNumber] = useState(detail.roomNumber);
  const [fromDate, setFromDate] = useState(detail.fromDate);
  const [toDate, setToDate] = useState(detail.toDate);
  const [_id, setId] = useState(detail._id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedDetail = {
      name,
      userEmail,
      roomNumber,
      fromDate,
      toDate,
      _id: detail._id // pass the id of the detail being edited
    };
    handleEdit(updatedDetail);
  }

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Edit Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>

       

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>


          <Form.Group controlId="formUserEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formRoomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(event) => setRoomNumber(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFromDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter from date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formToDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter to date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={() => handleEdit(null)}>Save changes</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default EditDetails;
