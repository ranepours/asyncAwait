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

let baseURL = "https://deckofcardsapi.com/api/deck";

//get A card and log its value
async function getCard(){
    let res = await get(`${baseURL}/new/draw/`);
    let value = res.data.cards[0].value;
    let suit = res.data.cards[0].suit;
    //console.log(res.data.cards[0]);
    console.log(`${value} of ${suit}`);
}
getCard();

//make two requests FROM THE SAME DECK so we get two separate cards and log their values
async function getCards(){
    let res = await get(`${baseURL}/new/draw/`);
    cardOne = res.data.cards[0];
    let deckId = res.data.deck_id;
    //console.log(deckId);
    let res2 = await get(`${baseURL}/${deckId}/draw/`);
    cardTwo = res2.data.cards[0];
    [cardOne, cardTwo].forEach((card) => {
        console.log(`${card.value} of ${card.suit}`);
    })
}
getCards();

//build html page which lets u draw from deck and render card to page each time u click "get card" button until all 52 cards have loaded onto page
async function deck(){
    const BTN = document.querySelector("button");
    const cardSpace = document.querySelector("#card-space");

    let res = await get(`${baseURL}/new/shuffle/`);
    BTN.addEventListener("click", async function(){
        let cardStuff = await get(`${baseURL}/${res.data.deck_id}/draw/`);
        let imgSrc = cardStuff.data.cards[0].image;
        let card = document.createElement("img");
        card.src = imgSrc;
        console.log(card.src)
        cardSpace.append(card);
        if (res.data.remaining === 0) {
            button.remove();
            alert("All cards pulled!");
        }
    })
}
deck();