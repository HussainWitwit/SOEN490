import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Row } from 'reactstrap';
import {useLocation, useHistory} from "react-router";
import TemplateConfiguration from './TemplateConfiguration';
import DateConfiguration from './DateConfiguration';
import RecommendationConfiguration from './RecommendationConfiguration';
import ConfirmationPage from './ConfirmationPage';




import './Modal.css';



const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '15%',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)'
}

const CONTAINER_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#DCDCDC',
    padding: '15%',
    paddingLeft: '47%',
    paddingRight: '47%',
    zIndex: '-1',
}

const HEADER_STYLES = {

}

const BUTTON_CONTAINER_STYLES = {

}

// const firstModal = Component => {
//     const formingfirstModal = ({open, children, onClose, ...props}) => {


//         if (!open) return null;

//         return (ReactDom.createPortal(
//             <>
            
//                 <div style={OVERLAY_STYLES}></div>
//                 <div style={MODAL_STYLES}>
//                     <h1>Modal 1</h1>
//                     <br></br>
//                     <br></br>
//                     <button>Next Modal</button>
//                     <br></br>
//                     <br></br>
//                     <Link to="/Modal2">Go To Modal 2</Link>
//                     <br></br>
//                     <br></br>
//                     <button onClick={onClose}>Close Modal</button>
//                     {children}
//                 </div>
//             </>,
//          document.getElementById('portal'), <Component {...props} user={user}/>);

//     }

// }

export default function Modal({ open, children, onClose,...props}) {

    if (!open) return null;

    return ReactDom.createPortal(
        <>
        
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                {/* <h1>Modal 1</h1>
                <br></br>
                <br></br>
                <button>Next Modal</button>
                <br></br>
                <br></br>
                <div style={CONTAINER_STYLES}>
                </div>
             
                <br></br>
                <br></br> */}


                {/* <ul id="ulModal">
                    <li id="liModal">
                        <Link id="aModal" to={
                            {
                                pathname: `/`,
                                state: {
                                    from: "root"
                                }
                            }
                            }>Template Configuration</Link>
                    </li>
                    <li id="liModal">
                        <Link id="aModal" to={
                            {
                                pathname: "/2",
                                state: {
                                    from: "root"
                                }
                            }
                        }>Date Configuration</Link>
                    </li>
                    <li id="liModal">
                        <Link id="aModal" to="/RecommendationConfiguration">Recommendation Configuration</Link>
                    </li>
                    <li id="liModal">
                        <Link id="aModal" to="/">Confirmation Page</Link>
                    </li>
                </ul>
                <div>
                    <Switch>
                        <Route exact path={"/"} component={TemplateConfiguration}/>
                        <Route exact path="/2" render={()=>(<TemplateConfiguration/>)}/>
                        <Route exact path="/RecommendationConfiguration"component={RecommendationConfiguration}/>
                        <Route exact path="/" component={ConfirmationPage}/>
                    </Switch>
                </div> */}


                <button onClick={onClose}>Close Modal</button>

                {children}
            </div>
        </>,
     <Modal />, document.querySelector('.modal'), document.getElementById('portal')
    )
}