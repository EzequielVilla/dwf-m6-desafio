import { Router } from "@vaadin/router";
import { state } from "../../state";

class initEspera extends HTMLElement{
    connectedCallback(){
        
        state.subscribe(()=>{
            const readyP1 = state.getState().readyP1;
            const readyP2 = state.getState().readyP2
            if(readyP1 == true && readyP2 == true) Router.go("/jugada")
            else this.render();
        })
        this.render();
    }

    esperandoA(miNombre:string, p1:string,p2:string){
        if (miNombre == p1) return p2
        else return p1
    }

    render():void{
        var style = document.createElement("style");
        const miNombre = state.getState().miNombre;
        const p1 = state.getState().jugador1;
        const p2 = state.getState().jugador2;
        const esperandoA = this.esperandoA(miNombre,p1,p2);
        style.textContent=
        `
            .footer-comp{
                margin-left:50px;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }        
            .titulo-cont{
                margin: 200px 0px;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-size: 35px;
            }
            
            .
        `
        this.innerHTML=
        `
        <info-component></info-component>
        
        <div class="titulo-cont">
            <h1 class="titulo-cont__texto">Esperando a que ${esperandoA} presione ¡Jugar!... </h1>  
        </div>
        
        <div class="footer-comp">
            <footer-component></footer-component>
        </div>
        
    `
    this.appendChild(style);
    }
}

customElements.define("espera-page",initEspera)