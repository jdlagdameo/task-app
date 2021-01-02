/**
 * Task Progress Component 
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const TaskProgress = ( props ) => {
    
    let total = props.tasks.tasks.length;

    let finishedTasks = props.tasks.tasks.filter(task => task.done).length;
    
    let percent = (total > 0) ? (100 * (finishedTasks/total)).toFixed(2) : 0;
   
    return (
        <ProgressBar now={percent} label={percent+`%`} />
    );
}

export default TaskProgress;