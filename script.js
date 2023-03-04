const wordBox = document.querySelector('#wordBox');

//fetching the data from JSON file
fetch('words.json')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < 5; i++) {
            processData(data);
        }
    })
    .catch((error) => {
        console.error(error);
    })

    
let cardCount = 0;

function processData(data) {
    const card = new Card({
        wordInformation: data[0]
    })
    card.element.style.setProperty('--i', cardCount % 5)
    wordBox.append(card.element);
    cardCount++;
}
