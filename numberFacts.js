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
let baseURL = "http://numbersapi.com";
let num = 7;
async function someFact(){
    let res = await get(`${baseURL}/${num}?json`);
    console.log(res);
}
someFact();
//get data on multiple numbers in single request and put all of them on page
let nums = [3,4,5];
async function someFacts(){
    let res = await get(`${baseURL}/${nums}?json`);
    console.log(res)
}
someFacts();
//get 4 facts on favorite number
async function fourFacts(){
    let facts = await Promise.all(Array.from({length: 4}, () => get(`${baseURL}/${num}?json`)));
    facts.forEach(res => {
        let msg = res.data.text;
        console.log(msg);
    })
}
fourFacts();