import React, {useEffect, useState} from "react"
import { MenuItem , FormControl, Select , Card, CardContent } from '@material-ui/core';
import InfoBox from "./InfoBox";
import './App.css';
import Map from "./Map";
import Table from "./Table";
import {sortData} from './util'
import LineGraph from "./LineGraph";



function App() {
  const [countries , setCountries] =  useState([])
  const [country , setCountry] = useState('worldwide') 
  const [countryInfo, setcountryInfo] = useState({})
  const [tableData , setTableData ] = useState([])

  useEffect(() =>{
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setcountryInfo(data)
      } )

  }, [])

  // useEffect = runs a piece of code based on a given condition 
  useEffect( () => {
    const getCountriesData = async () => {
      await fetch ('https://disease.sh/v3/covid-19/countries')
      .then(( response ) => response.json() )
      .then((data) =>{
        const countries = data.map( (country)  => (
          {
            name : country.country,
            value: country.countryInfo.iso2
          }) )

          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries (countries)
      } )
    }
    getCountriesData()
  } , [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value
    setCountry(countryCode) 
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setcountryInfo(data)
      })

  }

  console.log('country info >>> ' , countryInfo)

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1>COVID-19 TRACKER</h1> 
        <FormControl className="app__dropdown">
          <Select 
          variant="outlined" 
          onChange={onCountryChange}  
          value={country}
          >
            <MenuItem value ="worldwide"> Worldwide </MenuItem>
            {/* loop through all the conutries and show  */}
            {
              countries.map( country => (
                <MenuItem value={country.value} > {country.name} </MenuItem>

               ) )
            }

          </Select>
        </FormControl>
        
      </div> 

      <div className="app__stats">
            <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases}  total={countryInfo.cases} />
            <InfoBox title="Recovered" cases={countryInfo.todayRecovered}  total={countryInfo.recovered} />
            <InfoBox title="Deaths" cases={countryInfo.todayDeaths}  total={countryInfo.deaths} />
      </div>

      
      <Map/>
      </div>

      <Card className="app__right">
        <h1></h1>
        <CardContent>
          <h3>Live cases by country </h3>
          <Table countries={tableData} />
          
          <h4>worldwide new cases </h4>
          <LineGraph/>
        </CardContent>
        
      </Card>
  
    </div>
  );
}

export default App;

