/**
 * Task Group Item Form Component 
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const TaskGroupItemForm = props => {
    return(
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Body>
                <Form onSubmit="event.preventDefault();">
                    <Form.Group controlId="formTaskGroup">
                        <Form.Label><b>Task Name</b></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Task Name" 
                            value={props.taskGroupItemName} 
                            onChange={ (event) => props.change(event) } />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button variant="primary" onClick={props.submit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskGroupItemForm;