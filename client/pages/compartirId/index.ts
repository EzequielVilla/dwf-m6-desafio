import { Router } from "@vaadin/router";
import { state } from "../../state";


class initCompartirId extends HTMLElement{
    conexion: boolean;
    texto: String
    connectedCallback(){

                state.subscribe(()=>{
                    const estadoActual = state.getState();
                    if(estadoActual.jugador2 == false){
                        this.conexion = false;
                        this.render();
                    }
                    else {
                        this.conexion = true;
                        this.render();
                    }
                })

    }
    siguiente(){
        this.querySelector(".boton").addEventListener("click",(e)=>{
            e.preventDefault();
            Router.go("/instrucciones")
        })
    }
    //espero un cambio en la db para ver si ingreso alguien 

    render():void{
        const roomId = state.getState().roomId;
        var style = document.createElement("style");
        var botonStyle = document.createElement("style");
        if(this.conexion == false){
            this.texto = "sin conexion";
            botonStyle.textContent=`
            .boton{
                display: none;
            }
            `
        } else{
            this.texto = "hay conexion"
            botonStyle.textContent=`
            .boton{
                display: initial;

            }
            `
        }
        
        style.textContent=`
        .boton{
            display: none;
        }
        
        `
        
        this.innerHTML=`
        <p class="sala">Sala</p>
        <p class="codigo">${roomId}</p>
        
        <p class="int">Comparti el codigo:</p>
        <p  class="codigo">${roomId}</p>
        <p class="int">Con tu contrincante</p>
        <p class="conectado">${this.texto}</p>
        <boton-component class="boton">Siguiente</boton-component>
        `
        this.appendChild(style);
        this.appendChild(botonStyle);
        this.siguiente();
        
        
    }
}

customElements.define("compartirid-page",initCompartirId);