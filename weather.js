
// Get Weather Result of Surat on Loading the page
window.onload = () => {
    addEventListeners();
    getResult('Surat');
}

// API CALL -> from www.openweathermap.org
const api = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: 'fe20a782d29125df5715ec8cf001a09b'
};

// Const value for Days and Month in form of Array
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const cityNameDom = document.querySelector('#enterCity');

// function to chang format of Date received
function formatDate() {
    let currentDate = new Date();
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let date = currentDate.getDate();
    let year = currentDate.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}


function mapResponse(urlResponse) {
    let outputCityDom = document.querySelector('#outputCity');
    let outputDateDom = document.querySelector('#outputDate');
    let outputTempDom = document.querySelector('#outputTemp');
    let outputWeatherDom = document.querySelector('#outputWeather');
    let outputHighTempDom = document.querySelector('#outputHighTemp');
    let outputLowTempDom = document.querySelector('#outputLowTemp');
    if (urlResponse) {
        outputCityDom.innerText = `${urlResponse.name}, ${urlResponse.sys.country}`;
        outputDateDom.innerText = formatDate();
        outputTempDom.innerText = `${Math.floor(urlResponse.main.temp)} °C`;
        outputWeatherDom.innerText = urlResponse.weather[0].main;
        outputHighTempDom.innerText = `${Math.floor(urlResponse.main.temp_max)} °C / `;
        outputLowTempDom.innerText = `${Math.floor(urlResponse.main.temp_min)} °C`;
    }
    else {
        outputCityDom.innerText = '';
        outputDateDom.innerText = '';
        outputTempDom.innerText = '';
        outputWeatherDom.innerText = '';
        outputHighTempDom.innerText = '';
        outputLowTempDom.innerText = '';
    }

}

// Retrive the Data from Api call 
function getResult(cityName) {
    console.log(cityName);
    fetch(`${api.url}${cityName}&appid=${api.key}&units=metric`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                mapResponse(null);
                setTimeout(() => alert("City not found. Enter a valid city name."), 100);
            }
        })
        .then((responseBody) => {
            mapResponse(responseBody);
        });
}

// Event listeners
function addEventListeners() {
    cityNameDom.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            getResult(e.target.value);
        }
    })
}

