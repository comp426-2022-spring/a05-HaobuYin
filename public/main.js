// Focus div based on nav button click
// Home div
const home = document.getElementById('homenav')
home.addEventListener('click', goHome)
async function goHome() {
    reset();
    home.className = 'active';
    document.getElementById('home').className = 'shown';
}

// Flip one coin and show coin image to match result when button clicked
const single = document.getElementById('singlenav')
single.addEventListener('click', flipACoin)
async function flipACoin() {
    reset();
    single.className = 'active';
    document.getElementById('single').className = 'shown';
    const url = document.baseURI + 'app/flip/'
    console.log(url)
    fetch(url).then(
        function (response) {
            console.log(response)
            return response.json();
        }
    ).then(
        function (result) {
            console.log(result);
            document.getElementById('flipResult').innerHTML = 'Result: ' + result.flip;
            document.getElementById('quarter').setAttribute('src', './assets/img/' + result.flip + '.png')

        })
}
// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
const multi = document.getElementById('multinav')
const coins = document.getElementById('coins')
multi.addEventListener('click', flipMulti)
coins.addEventListener('submit', flipCoins)
function flipMulti() {
    reset();
    multi.className = 'active';
    document.getElementById('multi').className = 'shown';
}
// submit handler
async function flipCoins(event) {
    event.preventDefault();
    const url = document.baseURI + 'app/flip/coins/'
    const formEvent = event.currentTarget
    let n = document.getElementById('firstrow');
    n.remove();
    
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });

        console.log(flips);
        let firstRow = document.getElementById("graphs").rows[0];
        let count = flips.summary.heads + flips.summary.tails
        for (i=0;i<count;i++){
            let x = firstRow.insertCell(i-1);
            if(flips.raw[i]=='heads'){
                x.innerHTML = "<img src='./assets/img/heads.png' alt='hello'/ width=60 height=60>"
            } else {
                x.innerHTML = "<img src='./assets/img/tails.png' alt='hello'/ width=60 height=60>";
            }
        }
        
        /*let data1 = document.createElement('td')
        let headsPic = document.createElement('img').setAttribute('src', './assets/img/heads.png')*/
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.tails;
    } catch (error) {
        console.log(error);
    }

}
// data sender
async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);
    return response.json()
}

// Guess a flip by clicking either heads or tails button
const guess = document.getElementById('guessnav')
guess.addEventListener('click', guessAflip)
async function guessAflip() {
    reset();
    guess.className = 'active';
    document.getElementById('guess').className = 'shown';
}
const guessHeads = document.getElementById('guessHeads')
const guessTails = document.getElementById('guessTails')
guessHeads.addEventListener('click', guessGame('heads'))
guessTails.addEventListener('click', guessGame('tails'))
function guessGame(guess){
    console.log(guess+" it is")
}

// Helper function
function reset() {
    document.getElementById('home').className = 'hidden';
    document.getElementById('single').className = 'hidden';
    document.getElementById('multi').className = 'hidden';
    document.getElementById('guess').className = 'hidden';
    document.getElementById('homenav').className = 'hidden';
    document.getElementById('singlenav').className = 'hidden';
    document.getElementById('multinav').className = 'hidden';
    document.getElementById('guessnav').className = 'hidden';
}
