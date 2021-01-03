/**
 * Board Container
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TaskGroup from '../../components/TaskGroup/TaskGroup'
import { Button, Container } from 'react-bootstrap';

import TaskGroupForm from '../../components/ModalForms/TaskGroupForm/TaskGroupForm';
import TaskGroupItemForm from '../../components/ModalForms/TaskGroupItemForm/TaskGroupItemForm';

import { DragDropContext } from 'react-beautiful-dnd';
import classes from './Board.module.css';

const LOCAL_STORAGE_KEY = 'taskGroup';

const Board = props => {

    const [selectedGroupName, setSelectedGroupName] = useState('');

    const [taskGroupItemName, setTaskGroupItemName] = useState('');

    const [taskList, setTaskList] = useState([]);

    const [selectedTaskGroup, setSelectedTaskGroup] = useState('');

    const [selectedTaskItem, setSelectedTaskItem] = useState('');
  
    const [showTaskGroupForm, setShowTaskGroupForm] = useState(false);

    const [showTaskItemForm, setShowTaskItemForm] = useState(false);

    useEffect(() => {
      // Setup saved task groups in Local Storage
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedTodos) setTaskList(storedTodos);
    }, []);

    useEffect(() => {
      // Update local storage for each changes in taskList
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList));
    },[taskList]);
    
    /**
     * Add New Task Group Event 
     * 
     */
    const addEditTaskGroupHandler = () => {
      let getTaskGroupName = selectedGroupName;
      
      if(getTaskGroupName.trim().length === 0){ 
          alert('Please enter valid task group name') 
          return false;
      }
        
      if(selectedTaskGroup !== ''){
        const currentTaskList = taskList;
        const updatedTaskList = currentTaskList.map(taskGroup => {
          if(taskGroup.id === selectedTaskGroup){
            return {...taskGroup, "name": getTaskGroupName}
          }
          return taskGroup;
        });
        
        setTaskList(updatedTaskList);

      }else{
        const newTaskList = [...taskList, 
          {
            "id": uuidv4(),
            "name": getTaskGroupName,
            "tasks": []
          }];
        setTaskList(newTaskList);
      }
      
      closeTaskGroupFormHandler();

    }

    /**
     * Delete Task Group Event
     * 
     * @param {string} id 
     */
    const deleteTaskGroupHandler = id => {
      var answer = window.confirm("Are you sure you want to delete this group?");
      if (!answer) {
        return false;
      }

      const currentTaskList = taskList;
      let newCurrentTaskList = currentTaskList.filter(taskGroup => taskGroup.id !== id);
      setTaskList(newCurrentTaskList);
    }

    /**
     * Add Task Group Item Event
     * @param {*} id 
     */
    const addEditTaskGroupItemHandler = () => {
      let taskGroupID = selectedTaskGroup;
      let taskGroupItemID = selectedTaskItem;
      let val = taskGroupItemName;
      
      if(val.trim().length === 0){ 
        alert('Please enter valid task name') 
        return false;
      }

      let updatedTaskList = taskList;

      if(taskGroupItemID === ''){
        let newVal =  {
          "id": uuidv4(),
          "name": val,
          "done": false
        };
  
        const currentTaskList = taskList;
        updatedTaskList = currentTaskList.map(taskGroup => {
            if(taskGroup.id === taskGroupID){
              return {...taskGroup, tasks: [...taskGroup.tasks, newVal]}
            }
            return taskGroup;
          });
      }else{
        const currentTaskList = taskList;
        updatedTaskList = currentTaskList.map(taskGroup => {
            if(taskGroup.id === taskGroupID){
              let tg = taskGroup.tasks.map( task => {
                if(task.id === taskGroupItemID){
                  return {...task, name: val }
                }
                return task;
              });
              return {...taskGroup, tasks: tg }
            }
            return taskGroup;
          });  
      }
      
      setTaskList(updatedTaskList);
      closeTaskItemFormHandler();
    };

    /**
     * delete Task Group Item Event
     * @param {*} id 
     */
    const deleteTaskGroupItemHandler = (taskGroupID, taskGroupItemID) => {
      
      var answer = window.confirm("Are you sure you want to delete this task?");
      if (!answer) {
          return false;
      }

      const newArr = taskList.filter( task => task.id === taskGroupID);
      const groupTask = newArr[0].tasks.filter( taskItem => taskItem.id !== taskGroupItemID);
 
      const currentTaskList = taskList;
      const updatedTaskList = currentTaskList.map(taskGroup => {
          if(taskGroup.id === taskGroupID){
            return {...taskGroup, tasks: [...groupTask]}
          }
          return taskGroup;
        });

        setTaskList(updatedTaskList);

    };


    const handleOnDragEnd = (result) => {
      if(!result.destination) return;
      let currentGroupID = result.source.droppableId;
      let currentIndex = result.source.index;
      let destinationGroupID = result.destination.droppableId;
      let destinationIndex = result.destination.index;
      let taskGroupItemID = result.draggableId;
      const currentTaskList = taskList;
      
      // changes within the same group
      if(currentGroupID === destinationGroupID){
        const newArr = taskList.filter( task => task.id === destinationGroupID);
        let finalArray = Array.from(newArr[0].tasks);
        const [reorderItem] = finalArray.splice(currentIndex, 1);
        finalArray.splice(result.destination.index, 0, reorderItem);
        const updatedTaskList = currentTaskList.map(taskGroup => {
            if(taskGroup.id === destinationGroupID){
              return {...taskGroup, tasks: [...finalArray]}
            }
            return taskGroup;
        });
        setTaskList(updatedTaskList);
      }else{
        const newArr = currentTaskList.filter( task => task.id === currentGroupID);
        const groupTask = newArr[0].tasks.filter( taskItem => taskItem.id === taskGroupItemID);
        
        const updatedTaskList = currentTaskList.map(taskGroup => {
          // remove task from previous group 
          if(taskGroup.id === currentGroupID){

            const newArr = taskList.filter( task => task.id === currentGroupID);
            let finalArray = Array.from(newArr[0].tasks);
            finalArray.splice(currentIndex, 1);
            return {...taskGroup, tasks: [...finalArray]}

          }
          // transfer task to new group 
          else if(taskGroup.id === destinationGroupID){
            const newArr = taskList.filter( task => task.id === destinationGroupID);
            let finalArray = Array.from(newArr[0].tasks);
            finalArray.splice(destinationIndex, 0, ...groupTask);
            return {...taskGroup, tasks: [...finalArray]}
          }
          return taskGroup;
        });
        setTaskList(updatedTaskList);
      }
    }

    /**
     * Update Task item status handler 
     * 
     * @param {*} taskGroupID 
     * @param {*} taskGroupItemID 
     */
    const changeStatusHandler = ( taskGroupID, taskGroupItemID) => {
      const currentTaskList = taskList;
      const updatedTaskList = currentTaskList.map(taskGroup => {
          if(taskGroup.id === taskGroupID){
            let tg = taskGroup.tasks.map( task => {
              if(task.id === taskGroupItemID){
                return {...task, done: !task.done }
              }
              return task;
            });
            return {...taskGroup, tasks: tg }
          }
          return taskGroup;
        });
      
        setTaskList(updatedTaskList);

    }
    
    
    /**
     * Handle Bootstrap Modal show event
     */
    const showTaskItemFormHandler = (taskGroupID, taskGroupItemID = '') => {
      if(taskGroupItemID !== '')
      {
        const group = taskList.filter(g => g.id == taskGroupID);
        const task = group[0].tasks.filter( t => t.id == taskGroupItemID);
        setTaskGroupItemName(task[0].name);
      }else{
        setTaskGroupItemName('');
      }
    
      setSelectedTaskGroup(taskGroupID !== ''? taskGroupID : '');
      setSelectedTaskItem(taskGroupItemID !== ''? taskGroupItemID : '');
      setShowTaskItemForm(true)
    };

    /** 
     * Handle Bootstrap Modal close event
     */
    const closeTaskItemFormHandler = (id) => {
      setSelectedTaskGroup('');
      setSelectedTaskItem('');
      setShowTaskItemForm(false);
    }
  
    /**
     * Handle Bootstrap Modal show event
     */
    const showTaskGroupFormHandler = id => {
      const task = taskList.filter(task => task.id == id);
      setSelectedGroupName(id !== ''? task[0].name : '');
      setSelectedTaskGroup(id !== ''? id : '');
      setShowTaskGroupForm(true)
    };

    /** 
     * Handle Bootstrap Modal close event
     */
    const closeTaskGroupFormHandler = () => {
      setSelectedTaskGroup('');
      setShowTaskGroupForm(false);
    }

    let taskGroups = (
      taskList.map(tasks => (
          <TaskGroup 
            tasks={tasks} 
            show={showTaskGroupFormHandler}
            showTaskForm={showTaskItemFormHandler}
            deleteTaskGroupHandler={deleteTaskGroupHandler}
            addEditTaskGroupItemHandler={addEditTaskGroupItemHandler}
            editTaskGroupItemHandler={addEditTaskGroupItemHandler}
            deleteTaskGroupItemHandler={deleteTaskGroupItemHandler}
            handleOnDragEnd={handleOnDragEnd} 
            changeStatus={changeStatusHandler}
            key={tasks.id}>{tasks.name}</TaskGroup>
      ))
    );
        
    const changeGroupNameHandler = ( e ) => {
      setSelectedGroupName(e.target.value);
    }

    const changeTaskNameHandler = ( e ) => {
      setTaskGroupItemName(e.target.value);
    }

    return(
        <div className={classes.Board}>

          <Button className={classes.ButtonCreate}
            onClick={() => showTaskGroupFormHandler('')}>Create New Task Group</Button>

          <Container className={classes.BoardContainer} fluid>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              {taskGroups}
            </DragDropContext>
          </Container>
              
          <TaskGroupForm
            close={closeTaskGroupFormHandler} 
            show={showTaskGroupForm}
            submitTaskGroup={addEditTaskGroupHandler} 
            groupName={selectedGroupName}
            change={changeGroupNameHandler} />
          
          <TaskGroupItemForm 
            close={closeTaskItemFormHandler} 
            show={showTaskItemForm} 
            submit={addEditTaskGroupItemHandler} 
            taskGroupItemName={taskGroupItemName} 
            change={changeTaskNameHandler} />
        </div>
    );

}

export default Board;