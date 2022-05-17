class RequestHandler{

    constructor(apiDoc){
        this.apiDoc = apiDoc
        this.getAPIKey();
    }

    //This function will get my API key from a document and then save it in my RequestHandler class.
    // I need to figure out another way to do this, as someone could still see the code by stepping through this. 
    // I think it might be okay to actually just do this synchronously. 
    async getAPIKey(){
        
        let promise = await fetch(this.apiDoc);
        
        await promise.text()
            .then(textResponse => {this.setApiKey(textResponse)})
            .catch(() => console.log('there was an error with the apikey'));
    }

    setApiKey(response){
        this.apiKey = response;
    }

    async getLocation(zip){
        // let countryCode = 840;
        let zipCode = zip.toString();
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${this.apiKey}`)
        
        
        await response.json()
            .then(locationData => {this.getWeather(locationData)})
            .catch(() => console.log('there was an error'));
    }

    async getWeather(locationData){
      ;
        let locationName = locationData.name
        let locationLatitude = locationData.lat 
        let locationLongitude = locationData.lon

        console.log(locationLatitude, locationLongitude)
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationLatitude}&lon=${locationLongitude}&appid=${this.apiKey}&units=imperial`);

        await response.json()
            .then(jsonResponse => this.handleWeather(jsonResponse))
            .catch(error => (console.log('there was an error with the weather data', error)));
            
    }

    handleWeather(jsonResponse){

        console.log(jsonResponse);

        let requestTime = this.convertUnix(jsonResponse.dt)
        let sunriseTime = this.convertUnix(jsonResponse.sys.sunrise);
        let sunsetTime = this.convertUnix(jsonResponse.sys.sunset);

        console.log(`Times: Request ${requestTime} sunrise ${sunriseTime} sunset ${sunsetTime}`)

        console.log(jsonResponse.clouds);
        console.log(jsonResponse.clouds.name);

        console.log(jsonResponse.weather);
        console.log(jsonResponse.weather.value);
    }

    convertUnix(unixTimestamp){

        console.log('converting...')
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(unixTimestamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        console.log(hours, minutes, seconds);

        let formattedTime = `${hours}: ${minutes}: ${seconds}}`

        console.log(formattedTime);

        return formattedTime;
    }
}