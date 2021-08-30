import {state} from "./state"

export function tests(){
    state.initScore();
    testAJugarResultados();
    console.log('TERMINA TEST RESULTADOS');
    state.initScore();
    testGanador();
    console.log('TERMINA TEST GANADOR');
    state.initScore();
    //Pongo dos pcs a jugar entre si.
    testConfigPcYGanador();
    console.log('TERMINA TEST CONFIGPC');        
}

function testAJugarResultados(){
    ganaUsuario();
    state.initScore();
    ganaPc();
    empate();        
    function ganaUsuario(){
        const jugador = "piedra";
        const pc = "tijera";
        state.aJugar(jugador,pc);
        console.log(state.data);
        
        const jugador1 = "papel";
        const pc1 = "piedra";
        state.aJugar(jugador1,pc1);
        console.log(state.data);
        const jugador2 = "tijera";
        const pc2 = "papel";
        state.aJugar(jugador2,pc2);
        console.log(state.data);
    }
    function ganaPc(){
        const jugador = "piedra";
        const pc = "papel";
        state.aJugar(jugador,pc);
        console.log(state.data);
        const jugador1 = "papel";
        const pc1 = "tijera";
        state.aJugar(jugador1,pc1);
        console.log(state.data);
        const jugador2 = "tijera";
        const pc2 = "piedra";
        state.aJugar(jugador2,pc2);
        console.log(state.data);

    }
    function empate(){
        const jugador = "piedra";
        const pc = "piedra";
        state.aJugar(jugador,pc);
        const jugador1 = "papel";
        const pc1 = "papel";
        state.aJugar(jugador1,pc1);
        const jugador2 = "tijera";
        const pc2 = "tijera";
        state.aJugar(jugador2,pc2);
    }
    state.initScore();
}
function testGanador(){
    console.log(state.data); //0 0 
    const jugador = "piedra";
    const pc = "tijera";
    state.aJugar(jugador,pc);
    state.aJugar(jugador,pc);
    state.aJugar(jugador,pc);
    state.aJugar(jugador,pc);
    console.log(state.data);
    state.initScore();
    const jugador1 = "papel";
    const pc1 = "tijera";
    state.aJugar(jugador1,pc1);
    state.aJugar(jugador1,pc1);
    state.aJugar(jugador1,pc1);
    state.aJugar(jugador1,pc1);
    console.log(state.data);

    
}
//Funciona igual aunque tire error
function testConfigPcYGanador(){        
    while(state.getState().ganador == false){
        const uno = state.configPc();
        const dos = state.configPc();
        state.aJugar(uno, dos);
    }
}