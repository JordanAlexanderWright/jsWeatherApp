searchBtn = document.querySelector('#searchBtn');
searchField = document.querySelector('.searchField');

requests = new RequestHandler('apiDoc.txt');

searchBtn.addEventListener('click', someFunc);
searchField.addEventListener('keydown', anotherFunc);


function anotherFunc(e){
    if(e.key === 'Enter') {
        someFunc(e)
    } 
}

function someFunc(e) {
    e.preventDefault();
    let zipCode = searchField.value;
    console.log(zipCode);
    requests.getLocation(zipCode);
}

let UI = new UIHandler; 

console.log('hello');

UI.pickFunction('location', 'Louisville');

UI.pickFunction('status', "Raining");