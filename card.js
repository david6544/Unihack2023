class Card {
    constructor ({
        wordInformation
    }) {
        this.wordInformation = wordInformation;
        this.init();
    }

    // Private Properties

    // Method to generate a new card
    init = () => {
        const card = document.createElement('div');
        card.classList.add('card');

        const header = document.createElement('h1');
        header.classList.add('word');
        header.innerHTML = this.wordInformation.word;

        const wordInfo = document.createElement('div');
        wordInfo.classList.add('word-information');

        // Constant words
        const example = document.createElement('p');
        example.innerHTML = 'Example:';
        const origin = document.createElement('p');
        origin.innerHTML = 'Origins:';
        const synonyms = document.createElement('p');
        synonyms.innerHTML = 'Synonyms:';

        // JSON information words
        const reading = document.createElement('p');
        reading.innerHTML = this.wordInformation.phonetic;
        const example_detail = document.createElement('p');
        example_detail.classList.add('text-indent');
        console.log(this.wordInformation.meanings[0].definitions);
        example_detail.innerHTML = this.wordInformation.meanings[0].definitions[0].example;
        const origin_detail = document.createElement('p');
        origin_detail.classList.add('text-indent');
        origin_detail.innerHTML = this.wordInformation.origin;
        

        // Append
        wordInfo.append(example, example_detail, document.createElement('br'),
        origin, origin_detail, document.createElement('br'));
        card.append(header, reading, document.createElement('br'), 
        wordInfo);
        this.element = card;
    }
}