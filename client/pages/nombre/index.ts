import { Router } from "@vaadin/router";
import { rtdb } from "../../rtdb";
import { state } from "../../state";

class initNombre extends HTMLElement{
    connectedCallback(){
        state.refreshHandler(); 
        const rtdbRoomId:string = state.getState().rtdbRoomId;        
        if (rtdbRoomId != undefined){
            state.init(rtdbRoomId);
        }
        this.render();

        this.querySelector(".empezar").addEventListener("click",(e)=>{
            e.preventDefault();
            const nombre = document.querySelector(".nombre").shadowRoot.querySelector("input").value;
            state.crearUsuario(nombre).then(()=>{
                const unir:boolean = state.getState().unir;  
                if(unir == false){
                    state.crearSala(nombre).then((res)=>{
                        res.json().then(crearSalaResp =>{                            
                            const roomId = crearSalaResp.id;
                            const rtdbRoomId = crearSalaResp.rtdbRoomId;
                            const lastState = state.getState();
                            
                            state.setState({
                                ...lastState,
                                miNombre: nombre,                     
                                roomId,
                                rtdbRoomId,
                            })
                            state.init(rtdbRoomId);
                            Router.go("/compartirId");        
                        })
                    })
                } else if(unir == true){  
                    state.verificarUsuarios(rtdbRoomId).then(verifyRes =>{                      
                        const p1 = verifyRes.jugador1.nombre;
                        const p2 = verifyRes.jugador2.nombre;               
                        if (p2 == false && nombre != p1 ){                          
                            state.pushUsuario(nombre,rtdbRoomId).then(()=>{ 
                                const lastState = state.getState();
                                state.setState({
                                    ...lastState,
                                    miNombre:nombre,
                                })
                                Router.go("/instrucciones");
                            });
                        }
                        else if ((nombre == p1) || (nombre == p2)){ 
                            const lastState = state.getState();                    
                            state.setState({
                                ...lastState,
                                miNombre:nombre,
                            })
                            Router.go("/instrucciones");
                        }
                        else if (nombre != p1 || nombre != p2 ){                                           
                            Router.go("/advertencia");
                        }       
                    });                
                }
            });  
        })
    }

    render():void{
        var style = document.createElement("style");
        style.textContent=
        `
            .titulo{
                padding-top : 70px;
                padding-left: 35px;
                font-size: 80px;
                color: #009048;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .boton-comp{
                margin: 45px 20px 65px 65px;
            }
            .footer-comp{
                margin-left:50px;
            }
            .nombre-titulo{
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-size: 45px;
            }
            .input-c{
                margin: 20px 0px 20px 0px;
            }
            @media (min-width: 376px) {
                .boton-comp{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                .footer-comp{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                
                    
                    

                
            }
        `
        this.innerHTML=
        `
            <h1 class="titulo">Piedra <br> Papel o<br>Tijera </h1>
            <div class="boton-comp">
                <p class="nombre-titulo">Tu nombre</p>
                <input-component class="nombre"></input-component>
                <boton-component class="empezar">Empezar</boton-component>
               
            </div>
            <div class="footer-comp">
                <footer-component></footer-component>
            </div>
    `
    this.appendChild(style);
    }
}
customElements.define("nombre-page",initNombre)