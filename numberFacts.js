//recreate axios bc for some reason its not working any way i call it
function get(url){
    const request = new XMLHttpRequest();
    return new Promise ((resolve,reject) => {
        request.onload = function(){
            if(request.readyState != 4) return;

            //check status code
            if(request.status >= 200 && request.status < 300){
                resolve({
                    data: JSON.parse(request.response),
                    status: request.status,
                    request: request
                })
            } else {
                reject({
                    msg: "server error",
                    status: request.status,
                    request: request
                })
            }
        }
        request.onerror = function handleError(){
            request = null;
            reject({msg: "network error"});
        }
        request.open("GET", url);
        request.send();
    })
}
//NUMBER FACTS
//get fact about favorite number
const someFact = (num) => {
    return somePromise = get(`http://numbersapi.com/${num}`)
        .then(res => console.log(res.data))
        .catch(err => console.log("rejected", err))
}
someFact(7);
//get data on multiple numbers in single request and put all of them on page
let fourNumPromises = [];
for(let i = 1; i < 5; i++){
    fourNumPromises.push(get(`http://numbersapi.com/${i}`));
}
Promise.all(fourNumPromises)
    .then(numArr => {
        for(res of numArr){
            console.log(res.data);
        }
    })
    .catch(err => console.log(err));

//get 4 facts on favorite number
let url = "http://numbersapi.com/3";
let Promise1 = get(url)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.log("rejected", err));
let Promise2 = get(url)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.log("rejected", err));
let Promise3 = get(url)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.log("rejected", err));
let Promise4 = get(url)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.log("rejected", err));