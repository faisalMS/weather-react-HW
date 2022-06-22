import { useEffect, useState } from 'react';

// {
//   "temperature": "16 °C",
//   "wind": "6 km/h",
//   "description": "Sunny",
//   "forecast": [
//     {
//       "day": "1",
//       "temperature": "25 °C",
//       "wind": "11 km/h"
//     },
//     {
//       "day": "2",
//       "temperature": "+22 °C",
//       "wind": "6 km/h"
//     },
//     {
//       "day": "3",
//       "temperature": " °C",
//       "wind": "10 km/h"
//     }
//   ]
// }
const App = () => {
  const [counterName, setCountryName] = useState('');
  const [searchedCountry, setSearchedCountry] = useState('');
  const [temperatureCount, setTemperatureCount] = useState(0);
  const [windCount, setWindCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [ setForecastCount ] = useState('');

  useEffect(() => {
    const getDataFromApi = async () => {
      const request = await fetch('https://goweather.herokuapp.com/weather');
      const data = await request.json();
      setTemperatureCount(data.temperature);
      setWindCount(data.wind);
      setDescriptionCount(data.description);
      setForecastCount(data.forecast);
    };
    getDataFromApi();
  }, []);

  const onClick = async (e) => {
    const request = await fetch(
      'https://goweather.herokuapp.com/weather/' + counterName
    );
    const data = await request.json();

    if (request.status !== 200) {
      alert(data.error.message);
      return;
    }
    setSearchedCountry(counterName);
    setTemperatureCount(data.temperature);
    setWindCount(data.wind);
    setDescriptionCount(data.description);
    setForecastCount(data.forecast.value);
    setCountryName('');
  };

  return (
    <div className='container'>
        <>
          <h1 className='text-center'>Weather</h1>
          <div className='input-group  mt-3'>
            <input 
              type='text'
              value={counterName}
              onChange={(e) => setCountryName(e.target.value)}
              className='card form-control'
              placeholder='Country name'
            />
            <button
              onClick={onClick}
              className='card'
              type='button'
            >
              Get data
            </button>

            <h3 className='text-center mt-3 w-100'>
            Country weather {' '}
              <span style={{ color: '#ffdcae' }}>{searchedCountry}</span> as follow
              :
            </h3>
            <div className='data mt-3'>
              <div className='card2'>
                <h3 className="card-Temperature">Temperature</h3>
                <h3 className="text-center">{temperatureCount}</h3>
              </div>
              <div className='card2'>
                <h3 className="card-Wind">Wind</h3>
                <h3 className="text-center">{windCount}</h3>
              </div>
              <div className='card2'>
                <h4 className="card1-Description">Description</h4>
                <h4 className="text-center">{descriptionCount}</h4>
              </div>
            </div>
          </div>
        </>
    </div>
  );
};

export default App;

