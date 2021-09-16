import {rtdb} from "./rtdb"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
console.log(process.env.API_BASE_URL, 'process.env.HOST');





type Jugada = "piedra" | "papel" | "tijera";
type Jugadores = "usuario" | "pc";



export const state = {
    data : {
        unir: false,
        refresh:false,
    },
    listeners:[],

    subscribe(callback:(any) =>any){
        this.listeners.push(callback);
    },
    getState(){
        return this.data;
    },

    setState(newState):void{
        this.data = newState;
        for(const cb of this.listeners){       
            cb();         
        }          
        console.log('cambie:', this.data);
    },



    crearUsuario(nombre:string):Promise<any>{
        return fetch(API_BASE_URL+`/signup`,{
            method: 'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nombre,
            })
        })
    },
    
    crearSala(nombre):Promise<any>{

        return fetch(API_BASE_URL+`/createroom`,{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nombre,
            })
        })
    },

    
    validateRoomId(roomId:string):Promise<any>{
        return fetch(API_BASE_URL+`/checkid/${roomId}`,{
            method:"get",            
        }).then(res=>{
            
          return res;
        })
    },

    verificarUsuarios(rtdbRoomId:string):Promise<any>{
        return fetch(API_BASE_URL+`/verify/${rtdbRoomId}`,{
            method: "get",
        }).then(res=>{
            return res.json().then(data=>{
                return data;
            })
        });
    },
    pushUsuario(nombre:string, rtdbRoomId:string):Promise<any>{
        return fetch(API_BASE_URL+`/pushUser/${rtdbRoomId}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nombre,
            }),
        })
    },
    setReady(nombre:string, rtdbRoomId:string, ready:boolean){
        let jugador:string;
        if (nombre == this.data.jugador1) jugador = "jugador1";
        else jugador = "jugador2" 
        fetch(API_BASE_URL+`/setReady`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                jugador,
                rtdbRoomId,
                ready,
            })
        });
    },

    init(rtdbRoomId){
        const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}`);
        
        
        roomRef.on("value", (snapshot) =>{
            const lastState = this.getState();
            const p1 = snapshot.val().jugador1;
            const p2 = snapshot.val().jugador2;
            const ganador = snapshot.val().ganador;
            const scoreP1 = p1.score;
            const eleccionP1= p1.eleccion;
            const readyP1 = p1.ready;
            const readyP2 = p2.ready;
            const scoreP2 = p2.score;
            const eleccionP2= p2.eleccion;
            const jugador1 = p1.nombre;
            const jugador2 = p2.nombre;
            const eligioP1 = p1.eligio;
            const eligioP2 = p2.eligio;
            
            this.setState({
                ...lastState,
                jugador1,
                jugador2,
                scoreP1,
                scoreP2,
                eleccionP1,
                eleccionP2,
                readyP1,
                readyP2,
                eligioP1,
                eligioP2,
                ganador,
            });
            
            window.onbeforeunload = function() {
                this.setState({
                    ...lastState,
                    refresh:true,
                })
                localStorage.setItem("data", JSON.stringify({
                    ...lastState,  
                }));
            };
            this.refreshHandler();
            
        });        
    },
    refreshHandler(){
        if(this.getState().refresh == true){
            console.log('entra al if refresh');
            
            this.data = JSON.parse(localStorage.getItem("data"));    
            this.data.refresh = false;
                
        }
    },
    setJugada(jugada:string, jugador:string, rtdbRoomId:string):Promise<any>{
        
        return fetch(API_BASE_URL+`/setPlay/${jugador}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                jugada,
                rtdbRoomId,
            }), 
        });

    },
    setPunto(){
        const eligio1 = this.getState().eligioP1;
        const eligio2 = this.getState().eligioP2;
        const eleccionP1 = this.getState().eleccionP1;
        const eleccionP2 = this.getState().eleccionP2;
        const rtdbRoomId = this.getState().rtdbRoomId;
        
        let jugador:string;
        let score = 0;
        let scoreP1 = this.getState().scoreP1;
        let scoreP2 = this.getState().scoreP2;
        
        if(eligio1 == true && eligio2 == true){        
            if( eleccionP1 == "piedra" && eleccionP2 == "tijera" ||
                eleccionP1 == "papel" && eleccionP2 == "piedra" ||
                eleccionP1 == "tijera" && eleccionP2 == "papel"
                )
            {                
                jugador = "jugador1" 
                score = scoreP1+1;                                 

            }
            //empate
            else if(eleccionP1 == eleccionP2){
                console.log(`Empate. `);
            }          
            else{  
                jugador = "jugador2"
                score = scoreP2+1;
                
                }              
            this.setGanador(jugador,rtdbRoomId);
            fetch(API_BASE_URL+`/setPunto/${jugador}`,{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    rtdbRoomId,
                    score,           
                })
            });
        }
    },
    setGanador(jugador:string,rtdbRoomId:string){
        
        fetch(API_BASE_URL+`/setGanador/${jugador}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                rtdbRoomId,                
            })
        })
    },
    setEligioFalse(jugador:string):Promise<any>{
        const rtdbRoomId = this.getState().rtdbRoomId;
        return fetch(API_BASE_URL+`/setFalse/${jugador}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                rtdbRoomId,
                
            })
        })  
    }


}
       
    