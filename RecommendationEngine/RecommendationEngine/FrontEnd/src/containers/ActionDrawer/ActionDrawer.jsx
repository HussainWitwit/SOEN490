import React from 'react';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import './ActionDrawer.css';
import { dateFormat } from '../../utilities/DateTimeUtilities';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";

export default function ActionDrawer (props) {

    const { actionGrouping } = props;
    const assets = actionGrouping ? actionGrouping.assetNameList : [];
    const actions = actionGrouping ? actionGrouping.actions : [];

    let history = useHistory();

    // Animation style
    const animation = useSpring({
        opacity: 1,
        transform: 'translate3d(0px,0,0)',
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    });

    return (
        <animated.div style={animation}>
            <div className='actions-drawer-content-container'>
                <Grid className='actions-drawer-content' container>
                    <Grid id='info-container' item small={12}>
                        <p id='assets-title'>Recommendation:</p>
                        <p onClick={()=>{history.push(`/recommendations-manage`)}}>{actionGrouping ? actionGrouping.recommendationName : ''}</p>
                        <p id='assets-title'>Asset(s):</p>
                        {assets.map((asset, index) => (
                            <p id='asset-names' key={index}>{asset}</p>
                        ))}
                        <p id='actions-title'>Action(s):</p>
                    </Grid>
                    <Grid className='actions-container' item>
                        {actions.map((action, index) => (
                            <div id='action-item-container' key={index}>
                                <p id='action-title'>{dateFormat(action.recommendedDate)}</p>
                                <div id='display-text-container'>
                                    {action.displayText}
                                </div>
                                <p id='suggestion-date'>Suggested on {dateFormat(action.recommendedOnDate)}</p>
                            </div>
                        ))}
                    </Grid>
                    <div id='num-actions'>
                        <p>Total actions suggested: {actions.length}</p>
                    </div>
                </Grid>
            </div>
        </animated.div>
    )
}
