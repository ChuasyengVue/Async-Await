let url ="http://numbersapi.com";
let num = 1;
let nums = [2,3,4,5];

// 1. Make request to get fav num using async/await
// (include json query key)

async function favNum(){
        let res = await $.getJSON(`${url}/${num}?json`);
        console.log('response:',res);
}
favNum();


// 2. Multiple Data

async function multiNum(){
    let data = await $.getJSON(`${url}/${nums}?json/`)
    console.log(data);
}
multiNum();


// 3. Multiple Request 

async function fourFacts(){
    try{
        let facts = await Promise.all(
            nums.map(numbers => $.getJSON(`${url}/${numbers}?json`))
        );
        facts.forEach(data => {
            $('body').append(`<p>${data.text}</p>`);
        });
        } 
    catch (error){
        console.error('error :',error);
    }
}
fourFacts();