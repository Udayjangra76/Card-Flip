let words=[
    "image/eren.jpg",
    "image/gojo.jpg",
    "image/kaneki.png",
    "image/l.jpg",
    "image/lelouch.jpg",
    "image/tanjiro.jpeg",
    "image/thorfinn.jpg",
    "image/todoroki.jpg"
]

words=[...words, ...words];  // making 2 copy of above
let matches = 0;
let moves = 0;
let gameActive=true;

// dynamically creating cards
for(let i = 1; i<=16; i++){

    let card = document.createElement('div'); // creates a div element
    card.classList.add('flip-card'); // adds a class to the corresponding div

    let inner = document.createElement('div');
    inner.classList.add('flip-inner');

    let front = document.createElement('div');
    front.classList.add('front');

    let back = document.createElement('div');

    let rand = Math.floor(Math.random()*(16-i)); // to shuffle the cards

    back.innerHTML="<img src='"+words[rand]+"' alt = 'image' style='overflow: hidden; width: 100%; height: 100%; border-radius: 10px'>";
    words.splice(rand, 1); // delete the card

    back.classList.add("back");

    inner.appendChild(front);
    inner.appendChild(back);

    card.appendChild(inner);
    document.getElementById("grid").appendChild(card);
}

let clicked;
let cards = document.getElementsByClassName("flip-card");
document.getElementById("move").innerHTML = moves;
let i = 1;
for(let card of cards){
    card.addEventListener("click", (e)=>{
        if(!gameActive)return;

        if(i%2 == 0)
        moves++;

        i++;

        document.getElementById("move").innerHTML = moves;
        if(clicked){

            card.firstChild.classList.add("flipped");
            gameActive = false;
            setTimeout(()=>{

                if(card.firstChild.lastChild.innerHTML !== clicked.firstChild.lastChild.innerHTML){
                    card.firstChild.classList.remove("flipped");
                    clicked.firstChild.classList.remove("flipped");
                }
                else{
                    matches++;
                    card.style.visibility="hidden";
                    clicked.style.visibility="hidden";
                }
                clicked = undefined;
                gameActive = true;
            }, 500);
        }else{
            clicked = card;
            card.firstChild.classList.add("flipped");
        }
    })
}

setInterval(() => {
    if(matches === 8){    
        document.querySelector(".popup").style.display="flex";
        document.querySelector(".container").style.display="none";
        document.querySelector(".popup > div > h2").innerHTML="You Won !!"
    }
}, 100);

document.getElementById("reload").addEventListener("click", (e)=>{
    window.location.reload();
})