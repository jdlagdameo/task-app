/**
 * Task Group Component 
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React from 'react';
import classes from './TaskGroup.module.css';

import TaskGroupItem from './TaskGroupItem/TaskGroupItem';
import TaskProgress from '../TaskProgress/TaskProgress';

import { Card, Button, } from 'react-bootstrap';

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Droppable } from 'react-beautiful-dnd';

const taskGroup = props => {
    let taskList = (props.tasks.tasks.map((tasks, index) => (
        <TaskGroupItem 
            showTaskForm={props.showTaskForm}
            changeStatus={props.changeStatus}
            addTaskGroupItemHandler1={props.addTaskGroupItemHandler1}
            taskGroupID={props.tasks.id}
            taskGroupItemID={tasks.id}
            done={tasks.done}
            key={tasks.id}
            index={index}
            edit={props.editTaskGroupItemHandler}
            delete={props.deleteTaskGroupItemHandler}>{tasks.name}</TaskGroupItem>
    )));

    return (
        <Card className={classes.Card}>
            <Card.Header>
                <b>{props.children}</b>
                <Button variant="primary" size="sm" onClick={() => props.show(props.tasks.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>

                <Button variant="danger" size="sm" onClick={() => props.deleteTaskGroupHandler(props.tasks.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>

                <br /> 

                <TaskProgress tasks={props.tasks} />

            </Card.Header>
               
            <Card.Body className={classes.CardBody}>
                <Droppable droppableId={props.tasks.id}>
                    {(provided) => (
                        <ul className={classes.TaskList} {...provided.droppableProps} ref={provided.innerRef}>
                            { taskList }
                            { provided.placeholder }
                        </ul>
                    )}
                </Droppable>
            </Card.Body>

            <Card.Footer>
                <Button 
                    size="sm" 
                    onClick={() => props.showTaskForm(props.tasks.id)}>Add New Task</Button>
            </Card.Footer>
        </Card>
    );

}

export default taskGroup;