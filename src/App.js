import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';

export default class App extends React.Component {
  state = {
    data: { },
    country: '',
  }

  async componentDidMount () {
    // fetch the data
    // set the state
    
    const fetchedData = await fetchData()

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async(country) => {
    // console.log(country) // is the country comes here or not to see 
    // fetch the data
    // set the state

    const fetchedData = await fetchData(country) // can use console.log to see the the data is fetched or not 
    
    this.setState({ data: fetchedData, country: country });

  }

  render() {
    const {data, country} = this.state;

    return (
       <div className={styles.container}>  
         <img className={styles.image} src={coronaImage} alt="COVID-19"/>
         <Cards data={data}/> 
         <CountryPicker handleCountryChange={this.handleCountryChange}/>
         <Chart data={data} country={country}/>
       </div>
    );
  }
}