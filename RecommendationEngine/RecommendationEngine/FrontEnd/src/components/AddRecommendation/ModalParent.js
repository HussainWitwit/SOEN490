import React from 'react';
import Modal from './Modal';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default function ModalParent(props) {
    return (
        <div>
              <Modal open={props.open} onClose={props.onClose}></Modal>
              <Route exact path='/Modal' component={Modal} />
        </div>
    )
}
