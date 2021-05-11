import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    grid: {
        width: '100%',
        margin: '0px',
    },
    paper: {
        width: '100px',
        height: '100px',
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light,
    },
}));


export default function ProfilePage(props) {
    const [state,setState] = useState({
    
    })

    const propeller = props.selectedPokemon;

    console.log(propeller);



    const classes = useStyles();

    
    return (
        
        <Grid container spacing={4} className="classes.grid">
            <Grid item xs={12} md = {6}>
                <Paper className={classes.Paper} >BRAH</Paper>
            </Grid>
            <Grid item xs={12} md = {6}>
                <Paper className={classes.Paper}>BRuH</Paper>
            </Grid>
            <Grid item xs={12} md = {6}>
                <Paper className={classes.Paper}>BRAH</Paper>
            </Grid>
            <Grid item xs={12} md = {6}>
                <Paper className={classes.Paper}>BRuH</Paper>
            </Grid>
        </Grid>
    )
}


