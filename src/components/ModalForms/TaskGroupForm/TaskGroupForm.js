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
                <Form onsubmit={props.submitTaskGroup}>
                    <Form.Group controlId="formTaskGroup">
                        <Form.Label>Task Group Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Task Group Name" 
                            ref={props.taskGroupName}/>
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