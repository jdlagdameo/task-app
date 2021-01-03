/**
 * Task Group Item Component 
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React from 'react';

import { Button, Form, Card} from 'react-bootstrap';

import classes from './TaskGroupItem.module.css';
import { Draggable } from 'react-beautiful-dnd';

const taskGroupItem = props => {

    return (
        <Draggable
            key={props.taskGroupItemID} 
            draggableId={props.taskGroupItemID} 
            index={props.index} >
            {
                (provided) => (
                    <li 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={classes.TaskGroupItem}>
                           
                        <Card>
                            <Card.Body style={{padding: '10px'}}>
                            <p>
                                <input
                                    checked={props.done} 
                                    type="checkbox" 
                                    onChange={() => { props.changeStatus(props.taskGroupID, props.taskGroupItemID) }}/> 
                                { ' ' }
                                <span className={props.done? classes.strike : ''}>{props.children}</span> <br/>
                               
                            </p>
                            <p style={{textAlign: 'right', fontSize: '14px'}}>
                                <a href="#" 
                                    onClick={() => props.showTaskForm(props.taskGroupID, props.taskGroupItemID)}>Edit</a> {' '}
                                <a href="#"
                                    onClick={() => props.delete(props.taskGroupID, props.taskGroupItemID)}>Delete</a>
                            </p>
                            </Card.Body>
                        </Card>
                        
                </li>
                )
            }
       
        </Draggable>
    );
}

export default taskGroupItem;