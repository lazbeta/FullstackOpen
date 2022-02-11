import {useState , useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {

  return (
          <div>
   
          <h2>{country.name.common}</h2>
          <p>capital: {country.capital} <br/> population: {country.population}</p>
          <img
          src={country.flag}
          height={50}
          width={50}/>
             </div>
  )
}

const Filter = ({query, countries}) => {
  const filteredCountries = countries.filter(country => (
    country.name.common.toLowerCase().includes(query.toLowerCase())
    )) 
    if (!query) {

        return <></>
      } else if (filteredCountries.length === 1) {
        return (
          <div key={filteredCountries[0].name}>
          <Country country={filteredCountries[0]}/>
        </div>
        )
      } else if (filteredCountries.length > 2 || filteredCountries.length <=10) {
        return (
          <div>
            {filteredCountries.map(country=> {
              return (
                <div key={country.name.common}>
                  <p>{country.name.common}</p>
                </div>
              )
            })}
          </div>
  
          )} else if (filteredCountries.length > 10){
        return <div>too many matches, specify your search</div>
      }
}

  const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
    setCountries(response.data)
    })
  }, []);


  return (
    <div>
    <label>find country</label>
    <input
    type="text"
    value={query}
    placeholder='search'
    onChange={e => setQuery(e.target.value)}/>

    <Filter
    countries={countries}
    query={query}
    />

    </div>
  )
}

export default App;