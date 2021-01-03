/**
 * Task Group Form Component 
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const taskGroupForm = props => {
    return(
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Body>
                <Form onSubmit="event.preventDefault();">
                    <Form.Group controlId="formTaskGroup">
                        <Form.Label><b>Task Group Name</b></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Task Group Name" 
                            value={ props.groupName } 
                            onChange={ (event) => props.change(event) } />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button variant="primary" onClick={props.submitTaskGroup}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default taskGroupForm;