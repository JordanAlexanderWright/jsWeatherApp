class RequestHandler{

    constructor(apiDoc){
        this.apiDoc = apiDoc
        this.getAPIKey();
    }

    //I would like this to be asynchronous, but I need it to always return the key instead of a promise. 
    async getAPIKey(){
        
        let promise = await fetch(this.apiDoc);
        
        await promise.text()
            .then(textResponse => {this.setApiKey(textResponse)})
            .catch(() => console.log('there was an error with the apikey'));
    }

    setApiKey(response){
        this.apiKey = response;
    }

    async getWeather(zip){
        // let countryCode = 840;
        let zipCode = zip.toString();
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${this.apiKey}`)
        
        
        await response.json()
            .then(jsonResponse => {console.log(jsonResponse)})
            .catch(() => console.log('there was an error'));
    }

    test() {
        console.log('you tested positive');
    }
}