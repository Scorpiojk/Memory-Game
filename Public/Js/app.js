//Take elements from the index
const section = document.querySelector('section');

//Player lives
const playerLivesCount = document.querySelector("span");
let playerLives = 20;

//Difficult button
const dificult_easy = document.getElementById('easy');
const dificult_medium = document.getElementById('medium');
const dificult_impossible = document.getElementById('impossible');

//Link text
playerLivesCount.textContent = playerLives;

//Generate cards
const getData = () => [
    {imgSrc: './Public/images/beatles.jpeg', name: 'beatles'},
    {imgSrc: './Public/images/blink182.jpeg', name: 'blink182'},
    {imgSrc: './Public/images/fkatwigs.jpeg', name: 'fkatwigs'},
    {imgSrc: './Public/images/fleetwood.jpeg', name: 'fleetwood'},
    {imgSrc: './Public/images/joy-division.jpeg', name: 'joy-division'},
    {imgSrc: './Public/images/ledzep.jpeg', name: 'ledzep'},
    {imgSrc: './Public/images/metallica.jpeg', name: 'metallica'},
    {imgSrc: './Public/images/pinkfloyd.jpeg', name: 'pinkfloyd'},
    {imgSrc: './Public/images/beatles.jpeg', name: 'beatles'},
    {imgSrc: './Public/images/blink182.jpeg', name: 'blink182'},
    {imgSrc: './Public/images/fkatwigs.jpeg', name: 'fkatwigs'},
    {imgSrc: './Public/images/fleetwood.jpeg', name: 'fleetwood'},
    {imgSrc: './Public/images/joy-division.jpeg', name: 'joy-division'},
    {imgSrc: './Public/images/ledzep.jpeg', name: 'ledzep'},
    {imgSrc: './Public/images/metallica.jpeg', name: 'metallica'},
    {imgSrc: './Public/images/pinkfloyd.jpeg', name: 'pinkfloyd'}
];

//Randomize cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData
}

//Generator HTML
const cardGenerator = () => {
    const cardData = randomize();
    //Generate HTML
    cardData.forEach((item) => {    
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //Attach info to cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
    
        card.addEventListener('click', (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);           
        });
    });
};

//Check coincidences
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    //Logic
    if(flippedCards.length === 2) {
        
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = "none";
            }) 
            
        } else {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 800);
            })
        playerLives--;
        playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                setTimeout(() => restart("Try Again"), 600);
            }
        }
    }
    //Run a check if we win 
    if(toggleCard.length === 16) {
        restart("You Win")
    }
}


//Restart 
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item,index) => {
        cards[index].classList.remove('toggleCard');
        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1200)
        
    });
    
    playerLives = 5;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => {window.alert(text), 100});
}

//Change difficult
dificult_easy.addEventListener('click', () => {
    playerLives = 20;
    playerLivesCount.textContent = playerLives;
});
dificult_medium.addEventListener('click', () => {
    playerLives = 8;
    playerLivesCount.textContent = playerLives;
});
dificult_impossible.addEventListener('click', () => {
    playerLives = 1;
    playerLivesCount.textContent = playerLives;
});


cardGenerator()