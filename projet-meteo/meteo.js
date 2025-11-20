let count = 0
let weather = {
    "apikey": "7ba5ef6edaf235f00a2f97e8ee4da108",
    fetchWeather : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apikey)
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(data)
        document.querySelector(".city").innerText = "Le temps à " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidité: " + humidity + "%";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
	console.log("boucle" + count++)
    }
};

console.log("loading")
weather.fetchWeather("Calvi");

// Se répète toutes les heures
const delai = 60 * 60 * 1000
const timerId = setInterval(() => weather.fetchWeather("Calvi"), delai);

// S'arrête après 24 heures
const stop = 24 * 60 * 60 * 1000
setTimeout(() => { clearInterval(timerId); console.log('stop'); }, stop);