type Jugada = "piedra" | "papel" | "tijera";
type Jugadores = "usuario" | "pc";



export const state = {
    data : {},
    listeners:[],
    getState():object{
        return this.data;
    },

    setState(newState):void{
        this.data = newState;
        for(const cb of this.listeners){       
            cb();         
        }          
        console.log('cambie:', this.data);
    },






    // lo que ya estaba hecho del juego.
    initScore():void{ 
        const lastState = this.getState();
        this.data = {
            ...lastState,
            usuario: 0,
            pc: 0,
        }
        localStorage.setItem("score", JSON.stringify(this.data));
    },

    aJugar(jugador:Jugada, pc:Jugada):void{
        this.data = JSON.parse(localStorage.getItem("score"));
        if( jugador == "piedra" && pc == "tijera" ||
            jugador == "papel" && pc == "piedra" ||
            jugador == "tijera" && pc == "papel"
            )
        {
            // console.log(`gana usuario con ${jugador}`);               
            this.setPunto("usuario")
        }
        else if(jugador == pc){
            // console.log(`Empate. Usuario: ${jugador} y Pc: ${pc}`);
        }
        else{  
            // console.log(`gana pc con ${pc}`);
            this.setPunto("pc");
        }
    },
    setPunto(ganador:Jugadores):void{
        let puntaje = this.getState()[ganador];
        puntaje++;
        const lastState = this.getState();
        this.data = {
            ...lastState,
            [ganador]: puntaje,
        }
        this.chequear(ganador);
        localStorage.setItem("score", JSON.stringify(this.data));
    },
    chequear(ultimoGanador):void{
        const puntaje = this.getState();
            const lastState = this.getState();
            this.data = {
                ...lastState,
                ultimoGanador: ultimoGanador ,
            }    
    },
    configPc():string{
        const jugadas = ["piedra", "papel", "tijera"];
        const index = Math.floor(Math.random()*3);
        // console.log('Eligio:',jugadas[index]);
        return jugadas[index];

    },



}
       
    