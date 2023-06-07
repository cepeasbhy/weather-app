const form = document.getElementById('search-form');
let description = '';

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    let cityName = form.elements['cityName'].value;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&APPID={YOUR_API_KEY}'

    fetch(url).then((response) => {
        if(response.status == '404'){
            throw new Error('City Not Found');
        }else{
            return response.json();
        }
    }).then((responseJson) =>{

        document.getElementById('default-display').style.display = 'none';
        document.getElementById('weather-info').style.display = 'block';
    
        document.getElementById('temp-text').innerHTML = Math.floor(responseJson.main.temp - 273) + ' °C';
        document.getElementById('weather-icon').src = 'icons/'+responseJson.weather[0].icon+'.svg';
        document.getElementById('city-text').innerHTML = responseJson.name;
        description = responseJson.weather[0].description;
    
         document.getElementById('description-text').innerHTML = description.toUpperCase();
    
    }).catch((error) =>{
        document.getElementById('weather-info').style.display = 'none';
        document.getElementById('default-display').style.display = 'block';
        document.getElementById('default-display').innerHTML = 'City not found';
    });
});
