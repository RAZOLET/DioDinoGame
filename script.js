const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isFiring = false;
let isDead = false;
let position = 0;
let fireballPosition = 0;

function handleKeyup(event){
    if(event.keyCode === 32) {
        if(!isJumping) {
            console.log('PULOU!');
            jump();
        }
    }
    if(event.keyCode === 70) {
        if(!isFiring && !isJumping){
            console.log('LANÇOU FIREBALL!');
            fire();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);
            //Descendo
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function fire(){
    isFiring = true;
    createFireball();
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            console.log('CACTUS SAIU DA TELA (POS < -60)');
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Gameover
            clearInterval(leftInterval);
            isDead = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
            console.log('CACTUS MATOU DINO (FIM DE JOGO)');
        } else if (cactusPosition <= 1060 &&  fireballPosition >= -60 && (cactusPosition == fireballPosition || cactusPosition == fireballPosition-10)) { // (1000 - fireballPosition)) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            console.log('CACTUS (<=1060) QUEIMOU (==) POR FIREBALL (>=-60) OU FOI PULADO POR DINO');
        } else if(!isDead) {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
            console.log('CACTUS ANDOU (-10)');
            console.log(`CACTUS:cactusPosition = ${cactusPosition}`);
            console.log(`CACTUS:fireballPosition = ${fireballPosition}`);
        }
    }, 20);

    if(!isDead){
        console.log('CRIANDO NOVO CACTUS...');
        setTimeout(createCactus, randomTime);
    }
}

function createFireball() {
    console.log('CRIANDO FIREBALL...');
    const fireball = document.createElement('div');

    fireball.classList.add('fireball');
    fireball.style.left = 0 + 'px';
    background.appendChild(fireball);

    let rightInterval = setInterval(() => {
        if(fireballPosition > 1060) {
            clearInterval(rightInterval);
            background.removeChild(fireball);
            fireballPosition = 0;
            isFiring = false;
            console.log('FIREBALL SAIU DA TELA (POS > 1060)');
        } else if(isDead) {
            clearInterval(rightInterval);
            background.removeChild(fireball);
            fireballPosition = 0;
            isFiring = false;
            console.log('DINO MORREU FIREBALL TAMBÉM MORRE.'); 
        } else if(!isDead){
            fireballPosition += 10;
            console.log('FIREBALL ANDOU (+10');
            fireball.style.left = fireballPosition +'px';
            console.log(`FIREBALL:fireballPosition = ${fireballPosition}`);
        }
    }, 20);


}

createCactus();
document.addEventListener('keyup', handleKeyup);