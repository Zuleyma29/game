// Inicializacion de variables 
let tarjetasDestapadas = 0;
let tarjeta1= null;
let tarjeta2= null;
let primerResultado= null;
let segundoResultado= null;
let movimientos = 0;
let aciertos =0;
let temporizador = false;
let timer=50;
let timerInicial=30;
let tiempoRegresivoId = null;

//Apuntando a documneto HTML 
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//Funciones
function contarTiempo(){
    tiempoRegresivoId=setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer<0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas(numeros);
        }
    },1000, timer);
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada= document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled= true;
    }
}

// Funcion principal 
function destapar(id){

    if(temporizador == false){
      contarTiempo();
      temporizador=true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas ==1){
       // mostrar primer numero 
       tarjeta1 = document.getElementById(id)
       primerResultado = numeros[id]
       tarjeta1.innerHTML= `<img src="./imagenes/${primerResultado}.png" alt="">`;
       
       //desabilitar primer boton 
       tarjeta1.disabled=true;
     }else if(tarjetasDestapadas ==2){
        // Mostrar segundo elemnto 
        tarjeta2= document.getElementById(id);
        segundoResultado= numeros [id];
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt="">`;;

        // desabilitar segundo boton
        tarjeta2.disabled=true;

        // incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTMl=`Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            // encerrar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumantar aciertos
            aciertos++;
            mostrarAciertos.innerHTML= `Aciertos: ${aciertos}`;

            if(aciertos==8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML=`Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML = `Fantastico 🎊 Tardaste ${timerInicial=timer} segundos `;
                mostrarMovimientos.innerHTML=`Movimietos:${movimientos} 😎`;
            }
        } else{
            //Mostrar momentaneamente  valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML='';
                tarjeta2.innerHTML='';
                tarjeta1.disabled= false;
                tarjeta2.disabled= false;
                tarjetasDestapadas=0;
            },800);
        }
    }
}

function reiniciarJuego() {
    clearInterval(tiempoRegresivoId);

    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = 50; // O el tiempo inicial que desees
    timerInicial = 30; // O el tiempo inicial que desees
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    // Restablecer el contenido de las tarjetas a su estado original
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
    }
}

