class UIHandler {

    constructor(){
        this.caseList = ['location', 'temperature', 'status', 'upcoming']
    }

    // This function handles what UI element is going to be manipulated when Subitting data to ui
    pickFunction(type, data){
        switch(this.caseList.indexOf(type.toLowerCase())){

            case 0:
                type === 'location';
                console.log(`Location: ${data}`)
                break;
            
            case 1:
                console.log(`Temperature: ${data}`)
                break;

            case 2:
                console.log(`Status: ${data}`)
                break;

            case 3:
                console.log(`Upcoming Weather: ${data}`)
                break;

            default: 
                console.log('Something Went Wrong');
                break;

        }
    }
}