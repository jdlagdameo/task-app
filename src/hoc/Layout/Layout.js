/**
 * Layout HOC 
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Board from '../../containers/Board/Board';


const app = props => {
    return (
        <React.Fragment>
            <Toolbar />
            <Board />
        </React.Fragment>
    );
}


export default app;