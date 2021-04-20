const startMinutes = 1
let time = startMinutes * 60

const chronometer = document.getElementById('chronometer')

const fatherDiv = $('#fatherDiv')
const score = $('#score')

/**
 * Função reponsável por gerar o cronometro.
 */
function start(){
    function updateCountDown() {
        const minutes = Math.floor(time / 60)
        const timeNormalized = time < 0 ? 0 : time;
        const seconds = timeNormalized % 60
        const secondsNormalized = seconds < 10 ? '0' + seconds : seconds 
        const minutesNormalized = minutes < 0 ? '0' : minutes 
        chronometer.innerHTML = `${minutesNormalized}:${secondsNormalized}`
        $('#btn-cronometro').attr('disabled', true)
        time--
        if (secondsNormalized !== '00') {
            randomLetter()
        }

        if (secondsNormalized == '00' && minutesNormalized == '0') {
            fatherDiv.attr("style", "display:none");
            letter.attr("style", "display:none");
            score.attr("style", "display:none");
            $('#modal').removeAttr('style')
            $(".acertos").html(`acertos: ${acerto}`)
            $(".erros").html(`erros:${erros}`)
        }
    }
    setInterval(updateCountDown, 1000)
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const letter = $('#letter')

/**
 * Função que gera um letra aleatória.
 */
function randomLetter() {
    const random = letters.charAt(Math.floor(Math.random() * letters.length))
    letter.attr(`letterIs`, random)
    $("#letter").html(`${random}`);
}

/**
 * Função que verifica qual foi a letra pressionada.
 */
function keyPressed(evt){
    evt = evt || window.event;
    const key = evt.keyCode || evt.which;
    return String.fromCharCode(key);
}

let erros = 0
let acerto = 0

/**
 * Função que verifica se a letra pressionada é a letra correta.
 */
document.onkeypress = function(e) {
    const str = keyPressed(e);
    const lastLetter = str.split("").pop();
    const letterIs = document.getElementById('letter').getAttribute('letteris')
    console.log(letterIs.toLocaleLowerCase());
    lastLetter == letterIs.toLowerCase() ? acerto++ : erros++
	$("#score").html(`acertos: ${acerto} erros: ${erros}`);
};
