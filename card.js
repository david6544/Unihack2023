class Card {
    constructor ({
        wordInformation,
        isErase
    }) {
        this.isErase = isErase;
        this.wordInformation = wordInformation;
        this.init();
    }

    // Private Properties
    startPoint; offsetX; offsetY;

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
        example_detail.innerHTML = this.wordInformation.example;
        const origin_detail = document.createElement('p');
        origin_detail.classList.add('text-indent');
        origin_detail.innerHTML = this.wordInformation.origin;
        
        // Append
        wordInfo.append(example, example_detail, document.createElement('br'),
        origin, origin_detail, document.createElement('br'));
        card.append(header, reading, document.createElement('br'), 
        wordInfo);
        this.element = card;
        this.listenToMouseEvents();
    }
    
    // Mouse down
    listenToMouseEvents = () => {
        this.element.addEventListener('mousedown', (e) => {
        const { clientX, clientY } = e;
        this.startPoint = { x: clientX, y: clientY }
        document.addEventListener('mousemove', this.handleMouseMove);
        this.element.style.transition = 'transform 0s';
        });
    
        document.addEventListener('mouseup', this.handleMoveUp);
    
        // Stop card dragging
        this.element.addEventListener('dragstart', (e) => {
        e.preventDefault();
        });
    }
    
    // Dragging card
    handleMove = (x, y) => {
        this.offsetX = x - this.startPoint.x;
        this.offsetY = y - this.startPoint.y;
        const rotate = this.offsetX * 0.1;
        this.element.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${rotate}deg)`;
        // clear card when users drag too far
        if (Math.abs(this.offsetX) > this.element.clientWidth * 1.2) {
        this.clearCard(this.offsetX > 0 ? 1 : -1);
        }
    }
    
    // handling mouse movement
    handleMouseMove = (e) => {
        e.preventDefault();
        if (!this.startPoint) return;
        const { clientX, clientY } = e;
        this.handleMove(clientX, clientY);
    }
    
    // When mouse clicked up
    handleMoveUp = () => {
        this.startPoint = null;
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.element.style.transform = '';
    }
    
    // Functions to erase cards
    clearCard = (direction) => {
        this.startPoint = null;
        document.removeEventListener('mouseup', this.handleMoveUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
        document.removeEventListener('touchmove', this.handleTouchMove);
        this.element.style.transition = 'transform 1s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.offsetY}px) rotate(${90 * direction}deg)`;
        this.element.classList.add('dismissing');
        setTimeout(() => {
        this.element.remove();
        }, 1000);

        if(typeof this.isErase === 'function') {
            this.isErase();
        }
    }
}