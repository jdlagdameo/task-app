/**
 * Toolbar Component 
 * 
 * @author: John Dave Lagdameo <jdlagdameo@gmail>
 * @since: 01/02/2021
 * 
 */

import React from 'react'

import {Navbar} from 'react-bootstrap';

const toolbar = props => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                Task App
                </Navbar.Brand>
            </Navbar>
        </>
    );
}

export default toolbar;