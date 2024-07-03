let url = "https://deckofcardsapi.com/api/deck";

// 1.

async function singleCard(){
    let data = await $.getJSON(`${url}/new/draw`);
    console.log(data);
    let {suit,value} = data.cards[0];
    console.log(`Your card is a "${value.toLowerCase()} of ${suit.toLowerCase()}"`);
}
singleCard();

// 2.

async function sameDeck(){
    let cardOne = await $.getJSON(`${url}/new/draw`);
    console.log(cardOne)
    let deckId = cardOne.deck_id;
    console.log(deckId)
    let cardTwo = await $.getJSON(`${url}/${deckId}/draw`);
    
    [cardOne, cardTwo].forEach(card =>{
        let {suit,value} = card.cards[0];
        console.log(`Your card is a "${value.toLowerCase()} of ${suit.toLowerCase()}" from the deck ${deckId}`);
    });
}   
sameDeck();

// 3.

async function drawCards(){
    
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let data = await $.getJSON(`${url}/new/shuffle`);
    deckId = data.deck_id;

    $btn.show().on("click", async function(){
        let giveCard = await $.getJSON(`${url}/${deckId}/draw/`);
        let card = giveCard.cards[0].image;
        let toss = Math.random() * 90 - 40;
        console.log(giveCard);
        $cardArea.append(
            $('<img>',{
                src: card,
                css:{
                    transform: `rotate(${toss}deg)`
                }
            })
        );
        if (giveCard.remaining === 0) $btn.remove();
    });
}
drawCards();



