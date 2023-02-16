import React,{useState} from 'react';
import './App.css';



function App() {
const [country, setcountry] = useState("");
const [displaycountry, setdisplaycountry] = useState([]);

const handleForm =  (e) =>{
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/name/${country}?fullname=true`)
  .then((res) =>
      
          res.json()
  )
  .then((data)=> {
   
    for(let i=0;i<data.length;i++){
      
      if(country===data[i].name.common.toUpperCase()){
        
        
        // console.log(data[i])
       setdisplaycountry({
        name: `Name: ${data[i].name.common}`,
        capital : `Capital: ${data[i].capital[0]}`,
        flag : data[i].flags.png,
        imgdesc : data[i].flags.alt,
        currencyname : `Currency: ${data[i].currencies[Object.keys(data[i].currencies)].symbol} ${data[i].currencies[Object.keys(data[i].currencies)].name}`,
        languages : `Languages: ${Object.values(data[i].languages).toString().split(",").join(" ")}`,
        continent : `Continent: ${data[i].continents[0]}`
       })
      
      
        
      }
    }

   

    
  })
  

  setcountry("")
  
}



  return (
    <div className="App">
      <h1>Know Your Country</h1>
      <form className='form' onSubmit={handleForm}>
        <label htmlFor='country'>Country Name </label>
        <input 
        type='text'
        name='country'
        className='countryinput'
        required={true}
        placeholder={"Enter Country Name"}
        value={country}
        onChange={
          (e) => setcountry(e.target.value.toUpperCase())
        }
        />
       <button
        type='submit'
        className='submitbtn'
        >
          Get Info
        </button>
      </form>
      <div className='countryinfo'>
        
        
        
        <img src={displaycountry.flag} alt={displaycountry.imgdesc} />
        <div className='countrypara'>
        <p>{displaycountry.name} </p>
        <p>{displaycountry.capital} </p>
        <p>{displaycountry.currencyname} </p>
        <p>{displaycountry.languages}</p>
        <p>{displaycountry.continent}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
