import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { NativeSelect } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Loading from './../Loading'

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
    form: {
        margin: '10px auto 20px auto',
        alignItems: 'center',
        textAlign: 'center'
    },
    paper: {
        padding: 10,
        color: theme.palette.text.secondary,
        margin: '0px auto 50px auto',
    },
    grid: {
        margin: '10px 20px 10px 20px',
    },
    typo: {
        textAlign: 'left',
        color: 'grey',
        paddingLeft: 20,
    }
}));

export default function CountryForm() {
    
    const [countryData, setCountryData] = useState([{}]);
    const [dataLoad, setDataLoad] = useState(false);
    const [country, setCountry] = useState({});

    useEffect(() => {
        async function getData() {
            setDataLoad(true);
            const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
            let data = await response.json();
            delete data.countryitems[0].stat
            setCountryData(Object.values(Object.values(data.countryitems)[0]));
            setDataLoad(false);
        }
        getData();
    }, [])


    function updateValue(val) {
        countryData.map((key, index) => {
                if (countryData[index].title === val) {
                    setCountry(countryData[index]);
                }
                return (
                <>
                </>
                )
            }
        )
    }

    const dataPieChart = {
        labels: [
            'Active',
            'Recovered',
            'Deaths'
        ],
        datasets: [{
            data: [country.total_serious_cases + country.total_active_cases,
            country.total_recovered,
            country.total_deaths],
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
            data: [country.total_cases,
                        country.total_serious_cases + country.total_active_cases,
                        country.total_recovered,
                        country.total_deaths]
          }
        ]
      };      

    const classes = useStyles();
    
    if (dataLoad) {
    
    return (

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
    );   
        
    }
    
    return (
        <div>
            <div className={classes.form}>
                <FormControl>
                    <NativeSelect defaultValue='' onChange={(e) => updateValue(e.target.value)}>
                            <option>Select Country</option>
                            {countryData.map((key, index) =>
                            <option key={index} value={countryData[index].title}>
                            {countryData[index].title}
                            </option>)}
                    </NativeSelect>
                </FormControl>
            </div>
            
            <div className={classes.root}>
                <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(0,0,255,0.8)' }}>
                    <Typography variant="h5" gutterBottom>
                        <br />
                        <NumberFormat value={country.total_cases} displayType={'text'} thousandSeparator={true} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Total Cases
                    </Typography>
                </Paper>
            
                <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(255,165,0,0.8)' }}>
                    <Typography variant="h5" gutterBottom>
                        <br />
                        <NumberFormat value={country.total_serious_cases + country.total_active_cases} displayType={'text'} thousandSeparator={true} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Active
                    </Typography>
                </Paper>
            
                <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(0,128,0,0.8)' }}>
                    <Typography variant="h5" gutterBottom>
                        <br />
                        <NumberFormat value={country.total_recovered} displayType={'text'} thousandSeparator={true} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Recovered
                    </Typography>
                </Paper>
            
                <Paper elevation={3} style={{ color: 'white', backgroundColor: 'rgba(255,0,0,0.8)' }}>
                    <Typography variant="h5" gutterBottom >
                        <br />
                        <NumberFormat value={country.total_deaths} displayType={'text'} thousandSeparator={true} />
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