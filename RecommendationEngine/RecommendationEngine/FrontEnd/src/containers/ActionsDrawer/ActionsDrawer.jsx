import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import './ActionsDrawer.css';
import Grid from '@material-ui/core/Grid';

export function ActionDrawer () {

    const [open, setOpen] = React.useState(false);
    // Animation style
    const animation = useSpring({
        opacity: 1,
        transform: 'translate3d(0px,0,0)',
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    });


    const actions = [
        {
            title: 'Random Action',
            date: 'Monday, October 21st, 2020',
            displayText: 'Washing',
            published: '2 days ago'
        },
        {
            title: 'Random Action',
            date: 'Monday, October 21st, 2020',
            displayText: 'Washing',
            published: '2 days ago'
        },
        {
            title: 'Random Action',
            date: 'Monday, October 21st, 2020',
            displayText: 'Washing',
            published: '2 days ago'
        },
        {
            title: 'Random Action',
            date: 'Monday, October 21st, 2020',
            displayText: 'Washing',
            published: '2 days ago'
        }
    ]

    return (
        <animated.div style={animation}>
            <div className='actions-drawer-content-container'>
                <Grid className='actions-drawer-content' container>
                    <Grid id='info-container' item small={12}>
                        <p id='recommendation-title'>Recommendation Title</p>
                        <p id='assets-title'>Asset(s)</p>
                        <p id='aseet-names'>Asset 1, Asset 2, etc</p>
                    </Grid>
                    <Grid className='actions-container' item>
                        {actions.map((action, index) => (
                            <div id='action-item-container' key={index}>
                                <p id='action-title'>{action.title}</p>
                                <p id='action-date'>{action.date}</p>
                                <div id='display-text-container'>
                                    {action.displayText}
                                </div>
                                <p id='suggestion-date'>Suggested 2 days ago</p>
                            </div>
                        ))}
                        <p id='num-actions'>Total actions suggested: {actions.length}</p>

                    </Grid>
                </Grid>

            </div>

        </animated.div>
    )
}

export default connect(null, mapDispatchToProps)(ActionDrawer);