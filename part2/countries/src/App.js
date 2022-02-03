import {useState , useEffect} from 'react'
import axios from 'axios'

    const CountryList = (props) => {
      console.log(props, 'props')
      const filteredCountries = props.filteredCountries
      const handleShow = props.handleShow
        return (
          <ul>
            {
              filteredCountries.map(country => 
              <li key={country.name.common}>
                {country.name.common}
                <Button onClick={handleShow} text="show"/>
              </li>)
            }
          </ul>
        ) }

      const Button = (props) => {
        const {onClick, text} = props 
        return (
          <button onClick={onClick}>{text}</button>
        )
      }
    
      const Country = ({country}) => {
        return  (
            <div key={country.name.common}>
             <h3>{country.name.common}</h3>
             <p>capital {country.capital}
              population: {country.population}</p>
              <h3>Spoken languages</h3>
              <p>{country.languages}</p>
              <p>{country.flag}</p>
        </div>)
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

  const handleShow = (name) => setQuery(name)

  const filteredCountries = countries.filter(country => (
  country.name.common.toLowerCase().includes(query.toLowerCase())
    )) 
        if (!query) {
          return <></>
        };
        
    if (filteredCountries.length > 10 )  {
      return (
        <div>
         <p>too many matches, try different filter</p></div>
         )} 
    else if (filteredCountries.length > 1 || filteredCountries.length <= 10) 
     {
      return (
        <div>
      <CountryList filteredCountries={filteredCountries} handleShow={handleShow}/>
        </div>
        ) 
      }
     else if (filteredCountries.length === 1 ) {
        return <Country country={filteredCountries[0]}/>
      }
  

  return (
    <div>
<label>find country</label>
<input
type="text"
value={query}
placeholder='search'
onChange={e => setQuery(e.target.value)}/>

<div>{JSON.stringify(filteredCountries)}</div>

    </div>
  )
}

export default App;
