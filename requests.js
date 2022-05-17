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
            .then(jsonResponse => console.log(jsonResponse))
            .catch(error => (console.log('there was an error with the weather data', error)));
            
    }
}