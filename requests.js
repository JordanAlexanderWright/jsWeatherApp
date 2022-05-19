class RequestHandler{

    constructor(apiDoc){
        this.apiDoc = apiDoc;
        this.getAPIKey();
        this.weatherDataParsed = {};
        this.UI = new UIHandler;
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

    // This function takes a US zip code, makes sure it's a string, then plugs it into to be converted for use
    // IN the open weather api. 
    async getLocation(zip){
        
        let zipCode = zip.toString();
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${this.apiKey}`)
        
        // THis await takes the JSON response from my fetch request, saves the location name in my data object
        // that I will be passing to the UI to handle, then runs another function to get more data
        await response.json()
            
            .then(locationData => {
                this.getWeather(locationData)
                this.weatherDataParsed['location'] = locationData.name
                console.log(this.weatherDataParsed)
            })
            .catch(() => console.log('there was an error'));
    }

    // This function takes the longitude and latitude from the previous fetch request then makes another request
    // To get the weather information from the requested zip code
    async getWeather(locationData){
      
        let locationLatitude = locationData.lat;
        let locationLongitude = locationData.lon;

        console.log(locationLatitude, locationLongitude)
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationLatitude}&lon=${locationLongitude}&appid=${this.apiKey}&units=imperial`);

        await response.json()
            .then(jsonResponse => this.handleWeather(jsonResponse))
            .catch(error => (console.log('there was an error with the weather data', error)));
            
    }

    handleWeather(jsonResponse){

        // I save data from the response into my weatherDataParsed object in order to send to my UI. 
        console.log(jsonResponse);
        
        //Sunrise/ Sunset These do need to be converted from Unix

        this.weatherDataParsed['sunrise'] = this.convertUnix(jsonResponse.sys.sunrise);
        this.weatherDataParsed['sunset'] = this.convertUnix(jsonResponse.sys.sunset);
        

        console.log(`Sunrise ${this.weatherDataParsed['sunrise']} sunset ${this.weatherDataParsed['sunset']}`);

        // I'm leaving this for now, but later need to just pass into the object instead
        // Of saving a variable for it. 

        this.weatherDataParsed['temperature'] = jsonResponse.main.temp;

        console.log(`Current Temperature: ${this.weatherDataParsed['temperature']}`)

        this.weatherDataParsed['status'] = jsonResponse.weather[0].main;

           // How to get area max/min. Keeping here for now
        // let maxTemp = jsonResponse.main.temp_max;
        // let minTemp = jsonResponse.main.temp_min;


        console.log(`Current Weather: ${this.weatherDataParsed['status']}`)

        this.UI.pickFunction(this.weatherDataParsed)

    }

    convertUnix(unixTimestamp){
       
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(unixTimestamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let formattedTime = `${hours}:${minutes}:${seconds}`

        return formattedTime;
    }
}