import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

  // this bellow code is used at beginning, to fetch global every data, but when we select any specific country
  // then it has some modification ; bellow code is to be modified so to use in both case; global or specific country

// export const fetchData = async() => {
//   try {
//     const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url);

//     return { confirmed, recovered, deaths, lastUpdate };

//   } catch (error) {
    
//   }
// }



export const fetchData = async(country) => {
  let changeableUrl = url;
  
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };

  } catch (error) {
    console.log(error)
  }
}





// --for chart
export const fetchDailyData = async() => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }))

    return modifiedData;
  } catch (error) {
    console.log(error)
  }
}


// -- County Picker
export const fetchCountries = async () => {
  try {
      // to check whether we can fetch API or not, thats the approach, then destructure as per your purpose like bellow
    // const response = await axios.get(`${url}/countries`)
    // console.log(response)

    const { data: { countries } } = await axios.get(`${url}/countries`)

    return countries.map((country) => country.name)
  } catch (error) {
    console.log(error)
  }
}