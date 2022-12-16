import React, { Component } from 'react';
import Widecard from '../components/Widecard';

class Education extends Component {
    render() {
        return (
            <div className="condiv">
            <h1 className="subtopic">My Education</h1>
            <Widecard title="Software Programming" where="SaiGon Technology University" from="July 2010" to="2013"/>
            </div>
            )
        }
    }
    
export default Education
    