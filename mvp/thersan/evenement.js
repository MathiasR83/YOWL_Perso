let tickets = 12;
let tickets_progress = 67;


function watchAdd(){
    if(tickets<17){
        tickets++;
//la jauge est augmenter de 5% à chaque pub visionner
        if(tickets_progress<100){
            tickets_progress = Math.min(tickets_progress + 5, 100);
        }

        updateDisplay();
    }else{
        alert("Vous avez atteint la limite de publicités pour aujourd'hui!");
    }
}

function updateDisplay(){
    document.getElementById('progressBar');
    bar.style.width = currentProgress + '%';
    
    document.getElementById('progressText').innerText = currentProgress + '% complet ';
}