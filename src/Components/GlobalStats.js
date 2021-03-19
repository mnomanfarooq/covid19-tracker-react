import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import Loading from './../Loading'
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex','& > *': {
            width: '20%',
            height: theme.spacing(16),
            margin: '0px auto 0px auto',
            textAlign: 'center'
    },
},
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        color: 'grey',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: '30px',
        fontStyle: 'oblique',
        fontWeight: 'bold',
        margin: '10px auto 0px auto'
    }
}));


export default function GlobalStats() {

    const [globalData, setGlobalData] = useState({});
    const [dataLoad, setDataLoad] = useState(false);

    useEffect(() => {
        async function getData() {
            setDataLoad(true);
            const response = await fetch("https://api.covid19api.com/");
            let data = await response.json();
            delete data.results[0].source;
            setGlobalData(data.results[0]);
            setDataLoad(false);
        }
        getData();
    }, [])

//https://api.thevirustracker.com/free-api?global=stats
    const dataPieChart = {
        labels: [
            'Active',
            'Recovered',
            'Deaths'
        ],
        datasets: [{
            data: [globalData.total_serious_cases + globalData.total_active_cases,
            globalData.total_recovered,
            globalData.total_deaths],
            backgroundColor: ['rgba(255,165,0,0.7)', 'rgba(0,128,0,0.7)', 'rgba(255,0,0,0.7)'],
            hoverBackgroundColor: ['rgba(255,165,0,1)', 'rgba(0,128,0,1)', 'rgba(255,0,0,1)'],
            borderWidth: 1,
            borderColor: 'grey',
        }]
    };

    const dataBarChart = {
        labels: ['Total', 'Active', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'Cases',
            backgroundColor: ['rgba(0,0,255,0.4)','rgba(255,165,0,0.4)','rgba(0,128,0,0.4)','rgba(255,0,0,0.4)'],
            borderColor:  ['rgba(0,0,255,0.8)','rgba(255,165,0,0.8)','rgba(0,128,0,0.8)','rgba(255,0,0,0.8)'],
            borderWidth: 1,
            hoverBackgroundColor:  ['rgba(0,0,255,0.8)','rgba(255,165,0,0.8)','rgba(0,128,0,0.8)','rgba(255,0,0,0.8)'],
            hoverBorderColor: ['rgba(0,0,255,1)','rgba(255,165,0,1)','rgba(0,128,0,1)','rgba(255,0,0,1)'],
            data: [globalData.total_cases,
                        globalData.total_serious_cases + globalData.total_active_cases,
                        globalData.total_recovered,
                        globalData.total_deaths]
          }
        ]
      };      


    const classes = useStyles();
    
    if (dataLoad) {
        return (
            <>
            <div className={classes.title}>Global Stats</div>
            <div className={classes.root}>
            <Paper elevation={3} style={{ color: 'white', backgroundColor: 'blue'}}>
                    <Loading color="secondary"/>
            </Paper>
            <Paper elevation={3} style={{ color: 'white', backgroundColor: 'orange' }}>
                <Loading color="secondary"/>                
            </Paper>
            <Paper elevation={3} style={{ color: 'white', backgroundColor: 'green' }}>
                <Loading color="secondary"/>
            </Paper>
            <Paper elevation={3} style={{ color: 'white', backgroundColor: 'red' }}>
                <Loading color="secondary"/>
           </Paper>
        </div>
        </>
        );
    }
    
    return (
        <div>

            <div className={classes.title}>Global Stats</div>
            
            <div className={classes.root}>
                    <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(0,0,255,0.8)' }}>
                        <Typography variant="h5" gutterBottom>
                            <br />
                            <CountUp start={0} end={globalData.total_cases} duration={2.75} separator="," />
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Total Cases
                        </Typography>
                    </Paper>
          
                    <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(255,165,0,0.8)' }}>
                        <Typography variant="h5" gutterBottom>
                            <br />
                            <CountUp start={0} end={globalData.total_serious_cases + globalData.total_active_cases} duration={2.75} separator="," />
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Active
                            </Typography>
                    </Paper>
          
                    <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(0,128,0,0.8)' }}>
                        <Typography variant="h5" gutterBottom>
                            <br />
                            <CountUp start={0} end={globalData.total_recovered} duration={2.75} separator="," />
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Recovered
                            </Typography>
                    </Paper>
          
                    <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(255,0,0,0.8)' }}>
                        <Typography variant="h5" gutterBottom >
                            <br />
                            <CountUp start={0} end={globalData.total_deaths} duration={2.75} separator="," />
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Deaths
                        </Typography>
                    </Paper>
            </div>
            <br />
            <Grid container spacing={0}>
                <Grid item xs>
                        <Bar
                            data={dataBarChart}
                            options={{
                                maintainAspectRatio: true
                            }}
                        />
                </Grid>

                <Grid item xs>
                        <Pie data={dataPieChart} height={155} />
                </Grid>
            </Grid>

        </div>

    );
}
