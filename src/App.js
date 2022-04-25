import React, {useEffect, useState} from "react"
import { MenuItem , FormControl, Select , Card, CardContent } from '@material-ui/core';
import './App.css';



function App() {
  const [countries , setCountries] =  useState([])

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

          setCountries (countries)
      } )
    }
    getCountriesData()
  } , [])
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1> 
        <FormControl className="app__dropdown">
          <Select variant = "outlined" value='abc'>
            {/* loop through all the conutries and show  */}
            {
              countries.map( country => (
                <MenuItem value={country.value} > {country.name} </MenuItem>

               ) )
            }

          </Select>
        </FormControl>

      </div> 
      
    </div>
  );
}

export default App;

