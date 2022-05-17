searchBtn = document.querySelector('#searchBtn');
searchField = document.querySelector('.searchField');

requests = new RequestHandler('apiDoc.txt');

searchBtn.addEventListener('click', someFunc)

function someFunc(e) {
    e.preventDefault()
    console.log('hello');
    let zipCode = searchField.value;
    requests.getWeather(zipCode);

}

// let answer = requests.getWeather(40220);

// console.log(answer);
