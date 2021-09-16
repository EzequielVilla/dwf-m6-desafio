import { Router } from "@vaadin/router";
import { state } from "../../state";


class initCompartirId extends HTMLElement{
    conexion: boolean;
    texto: String
    connectedCallback(){
        state.refreshHandler(); 
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
    

    render():void{
        const roomId = state.getState().roomId;
        var style = document.createElement("style");
        var botonStyle = document.createElement("style");
        if(this.conexion == false){
            this.texto = "Sin conexion";
            botonStyle.textContent=`
            .boton{
                display: none;
            }
            `
        } else{
            this.texto = "Hay conexion"
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
        .info{
            text-align: right;
            font-size: 24px;
            margin-right: 10px;
        }
        .info__sala{
            font-weight: bold;
        }
        
        .comparti{
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            
            font-size: 35px;
        }

        .codigo{
            font-weight: bold;
            font-size: 48px;
        }
        .conectado{
            margin: 15px 0px;
        }
        `      
        this.innerHTML=`
        <div class="info">
        
            <p class="info__sala">Sala</p>
            <p class="info__codigo">${roomId}</p>
        </div>
        
        <div class="comparti">
            <p class="int">Comparti el codigo:</p>
            <p class="codigo">${roomId}</p>
            <p class="int">Con tu contrincante</p>
            <p class="conectado">${this.texto}</p>
            <boton-component class="boton">Siguiente</boton-component>
        </div>
        `
        this.appendChild(style);
        this.appendChild(botonStyle);
        this.siguiente();
        
        
    }
}

customElements.define("compartirid-page",initCompartirId);