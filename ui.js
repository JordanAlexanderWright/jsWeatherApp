class UIHandler {

    constructor(){

    }

    pickFunction(type, data){
        switch(type){

            case type === 'location':
                console.log(`Location: ${data}`)
                break;
            
            case type === 'temperature':
                console.log(`Temperature: ${data}`)
                break;

            case type === 'status':
                console.log(`Status: ${data}`)
                break;

            case type === 'upcoming':
                console.log(`Upcoming Weather: ${data}`)
                break;

        }
    }
}