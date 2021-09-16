import { Router } from "@vaadin/router";
import { state } from "../../state";

class initInstruccion extends HTMLElement{
    connectedCallback(){
        this.setFalseReady();
        this.render();
    }
    setFalseReady(){
        const p1 = state.getState().jugador1;
        const p2 = state.getState().jugador2;
        const miNombre = state.getState().miNombre;
        const rtdbRoomId = state.getState().rtdbRoomId;
        if(p1 == miNombre)
            state.setReady(p1,rtdbRoomId,false);
        else    
            state.setReady(p2,rtdbRoomId,false);
       
    }

    render():void{
        const nombre = state.getState().miNombre;
        const rtdbRoomId = state.getState().rtdbRoomId;

        var style = document.createElement("style");
        style.textContent=
        `
            .titulo-cont__texto{
                width:315px;
                padding-top : 70px;
                padding-left: 35px;
                font-size: 40px;
                
            }
            .boton-comp{
                margin: 45px 20px 65px 65px;

            }
            .footer-comp{
                margin-left:50px;
            }

            .boton-comp{
                margin-top: 45px;
                margin-bottom:65px;
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
            @media (min-width: 376px) {
                .inst-cont{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                .titulo-cont{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                .titulo-cont__texto{   
                    width:300px;             
                }
               
            
            }
        `
        this.innerHTML=`
                <div class="info-container">
                    <info-component></info-component>
                </div>
                <div class="titulo-cont">
                    <h1 class="titulo-cont__texto">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos. </h1>  
                </div>
                <div class="boton-comp">
                    <boton-component class="boton">¡Jugar!</boton-component>
                </div>
                <div class="footer-comp">
                    <footer-component></footer-component>
                </div>
        `

        this.appendChild(style);
        this.querySelector(".boton").addEventListener("click", (e)=>{
            e.preventDefault();
            state.setReady(nombre,rtdbRoomId, true)
                Router.go("/espera");
            
        })
    }
}
customElements.define("instrucciones-page", initInstruccion)