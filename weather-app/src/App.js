import './App.css';
import {useState} from "react";

function App() {
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [date, setDate] = useState('')

    const api = {
        key: 'b04ac7beaea0f962c2e9616ad85dce2e',
        base: 'https://api.openweathermap.org/data/2.5/'
    }

    const currentDay = () => {
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        setDate(new Date().toLocaleDateString('en-US', options))
    }

    const getWeather = (e) => {
        if (e.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => setData(result))

            setQuery('')
            currentDay()
        }
    }

    return (
        <div className={(typeof data.main != 'undefined') ? `app app-${data.weather[0].main.toLowerCase()}` : 'app'}>
            <div className="search">
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyPress={getWeather}
                    placeholder="Search..."
                    type="text"
                />
            </div>
            {(typeof data.main != 'undefined') ? (
                <div className="container">
                    <div className="top">
                        <div className="location">
                            <p>{data.name}</p>
                        </div>
                        <div className="temp">
                            <h1>{data.main.temp.toFixed()}&#xb0;C</h1>
                        </div>
                        <p>{date}</p>
                        <div className="description">
                            <p>{data.weather[0].main}</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="feels">
                            <p className="bold">{data.main.feels_like.toFixed()}&#xb0;C</p>
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            <p className="bold">{data.main.humidity}</p>
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            ) : ('')}
        </div>
    );
}

export default App;
