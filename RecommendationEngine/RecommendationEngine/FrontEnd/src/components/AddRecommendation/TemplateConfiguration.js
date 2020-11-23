import React from 'react'
import {useLocation, useHistory} from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './TemplateConfiguration.css';

const MODAL_STYLES = {
    position: 'fixed',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '100px',
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

// const colour = {
//     backgroundColor:'#ff0000',
//     padding: '100px',
    
// }

export default function TemplateConfiguration(props) {
    const history = useHistory();

    function goBackHandle(){
        history.goBack();
    }
    return (
        <div>
         {/* <div style={OVERLAY_STYLES}></div> */}
            <div style={MODAL_STYLES}>
            Template Configuration
            <button onClick={goBackHandle}>Go Back</button>
          <Link id="aModal" to={
                            {
                                pathname: "/2",
                                state: {
                                    from: "/"
                                }
                            }
                        }>Date Configuration</Link>
                           <div>
                    <Switch>
                        <Route exact path="/:id" render={()=>(<h1>YOOO</h1>)}/>
                    </Switch>
                </div>
            </div>
            {props.childrenProps}
        </div>
        
    )
}
