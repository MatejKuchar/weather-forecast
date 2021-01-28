const form = document.getElementById('form');
const input = document.getElementById('forecastInput');
const button = document.getElementById('button');
const message = document.getElementById('message');
const warning = document.querySelector('.warning');

const apiKey = '3dc2782704c76b46551d64b37c782440';

form.addEventListener('submit', getFormInput);
form.addEventListener('keyup', function(){
    document.getElementById('watherInfo').innerHTML = "";

});

function getFormInput(e){
    const loader = document.createElement('img');
    loader.setAttribute('src', 'loader.gif');
   
    document.querySelector('.loader-img').appendChild(loader);

    if(!input.value.length){
        document.querySelector('.loader-img').removeChild(loader);
        let warningMessage =    `<div class="alert alert-danger mt-3" role="alert">
                                Input is empty!
                                </div>`;
        warning.innerHTML = warningMessage;
        setTimeout(() => {
            warning.innerHTML = '';
        }, 2500)
    } else {
        let location = input.value;
        setTimeout(() => {
            document.querySelector('.loader-img').removeChild(loader);
            getWeather(location);
        }, 1500);
    }

    e.preventDefault();
}


async function getWeather(location){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        let {name, main, weather} = data;
        let {country} = data.sys;
        let {temp, humidity} = main;
        let [type] = weather;

        let weatherData = 
                            `
                            <div class="card text-center mt-3">
                                <div class="card-header">
                                    
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${name}, ${country}</h5>
                                    <p style="text-transform:capitalize;">
                                        <b>Temperature: </b>${temp}&#8451;<br>
                                        <b>Humidity: </b>${humidity}&percnt;<br>
                                        <b>Weather: </b>${type.main} - ${type.description}
                                    </p>
                                </div>
                                <div class="card-footer text-muted">
                                </div>
                            </div>
                            `;

        document.getElementById('watherInfo').innerHTML = weatherData;
        input.value = '';

    } catch(e){
        console.log(e);
    }

}
