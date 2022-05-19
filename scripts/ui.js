class UIHandler {

    constructor(){
        this.caseList = ['location', 'temperature', 'status', 'upcoming']
    }

    // This function handles what UI element is going to be manipulated when Subitting data to ui
    // I iterate through, get keys as a list, then for each key I run it through here to be handled. 
    // Very cool way to do this. Ref: https://stackoverflow.com/questions/5464362/javascript-using-a-condition-in-switch-case
    pickFunction(data){
        
        let weatherKeys = Object.keys(data)
        weatherKeys.forEach((dataType) => {

            switch(true){

                case dataType === 'location':
                    console.log(`Location: ${data['location']}`)
                    document.querySelector(`#${dataType}`).innerHTML = `Location: ${data['location']}`
                    break;
                
                case dataType === 'temperature':
                    console.log(`Temperature: ${data['temperature']}`)
                    document.querySelector(`#${dataType}`).innerHTML = `Temperature: ${data['temperature']}`
                    break;

                case dataType === 'status':
                    console.log(`Status: ${data['status']}`)
                    document.querySelector(`#${dataType}`).innerHTML = `Status: ${data['status']}`
                    break;

                case dataType === 'upcoming':
                    console.log(`Upcoming Weather: ${data['upcoming']}`)
                    document.querySelector(`#${dataType}`).innerHTML = `Upcoming Weather: ${data['upcoming']}`
                    break;

                case dataType === 'sunset':
                    console.log(`Sunset Time: ${data['sunset']}`)
                    document.querySelector(`#${dataType}`).innerHTML = `Sunset Time: ${data['sunset']}`
                    break;

                case dataType === 'sunrise':
                    console.log(`Sunrise Time: ${data['sunrise']}`)
                    document.querySelector(`#${dataType}`).innerHTML = `Sunrise Time: ${data['sunrise']}`
                    break;

                default: 
                    console.log('Something Went Wrong In Data Selecting');
                    break;

                    }
        })             
    }

    setLocation(locationData){
        document.querySelector('#location').innerHTML = locationData
    }
}