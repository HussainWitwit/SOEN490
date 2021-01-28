import React from 'react';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import './ActionsDrawer.css';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

export function ActionDrawer (props) {

    const { actionGrouping } = props;
    const assets = actionGrouping ? actionGrouping.assetNameList : [];
    const actions = actionGrouping ? actionGrouping.actions : [];

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
                        <p id='recommendation-title'>Recommendation Title</p>
                        <p id='assets-title'>Asset(s)</p>
                        {assets.map((asset, index) => (
                            <p key={index}>{asset}</p>
                        ))}
                        <p id='actions-title'>Action(s)</p>
                    </Grid>
                    <Grid className='actions-container' item>
                        {actions.map((action, index) => (
                            <div id='action-item-container' key={index}>
                                <p id='action-title'>{action.title}</p>
                                <p id='action-date'>{action.date}</p>
                                <div id='display-text-container'>
                                    {action.displayText}
                                </div>
                                <p id='suggestion-date'>Suggested on {action.recommendedOnDate}</p>
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

export default connect()(ActionDrawer)