import { Router } from "@vaadin/router";
import { state } from "../../state";


class initResultado extends HTMLElement{
    connectedCallback(){
        state.refreshHandler(); 
        this.render();
    }
    render(){

        const estrellaPerdedora = require("url:./../../img/StarPerdedora.svg");
        const estrellaGanadora  = require("url:./../../img/StarGanadora.svg");
        const ganador = state.getState().ganador;
        const nombreGanador = state.getState()[`${ganador}`];
        const miNombre = state.getState().miNombre;
        const jugador1 = state.getState().jugador1;
        if(miNombre == jugador1){
            state.setEligioFalse("jugador1");
        }
        else{
            state.setEligioFalse("jugador2");
        }
        
        
        
        this.classList.add("cuadro-cont");
        
        var style = document.createElement("style");
    
        this.innerHTML=`
            <div class="imagen-comp">    
                <imagen-estrella></imagen-estrella>
            </div>
            <div class="cuadro-comp">
                <cuadro-component></cuadro-component>
            </div>
            <div class='boton-comp'>
                <boton-component>Volver a Jugar</boton-component>
            </div>
        `

        //GANADOR
        if(nombreGanador == miNombre){
            style.textContent=
            `   
            .inst-cont{
                position:fixed;
                background-image: url("./../../img/fondo.svg");
                overflow: hidden;
            }
            .cuadro-cont{
                background-color:  rgba(136, 137, 73, 0.9);
                height:100vh;
                width:100%;
                z-index:1;
                position:fixed;
    
    
            }
            .imagen-comp{
                padding: 0px 60px;
                padding-top: 25px;
            }
            .cuadro-comp{
                padding: 20px 55px;   
    
            }
            .boton-comp{
                padding:0px 20px;
                padding-bottom:20px;
            }  
            @media (min-width: 376px) {
                .inst-cont{
                      
                    left:35%;
    
                }
                .imagen-comp{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    
                    padding-top: 25px;
                }
    
                .cuadro-comp{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    
                    padding: 20px;   
       
                }
                .boton-comp{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding:0px;
                    padding-bottom:20px;
                }  
            }
            ` 
            this.appendChild(style);
            
            const imagen = this.querySelector("imagen-estrella").shadowRoot.querySelector("img");
            const texto = this.querySelector("imagen-estrella").shadowRoot.querySelector(".texto");
    
            texto.textContent= "Ganaste";
            imagen.setAttribute("src", estrellaGanadora)   
        }
        //PERDEDOR
        else{
            style.textContent=
            `
                .inst-cont{
                    position:fixed;
                    background-image: url("./../../img/fondo.svg");    
                    overflow: hidden;
    
                }
                .cuadro-cont{
                    background-color: rgba(137, 73, 73, 0.9) ;
                    height:100vh;
                    width:100%;
                    z-index:1;
                    position:fixed;
    
    
                }
                .imagen-comp{
                    padding: 0px 60px;
                    padding-top: 25px;
                }
                .cuadro-comp{
                    padding: 20px 55px;   
       
                }
                .boton-comp{
                    padding:0px 20px;
                    padding-bottom:20px;
                }  
                @media (min-width: 376px) {
                    .inst-cont{
                        left:35%;
                    }
                    .imagen-comp{
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        
                        padding-top: 25px;
                    }
                    .cuadro-comp{
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        
                        padding: 20px;   
           
                    }
                    .boton-comp{
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        padding:0px;
                        padding-bottom:20px;
                    }  
                }
            `
    
            this.appendChild(style);
            
            const imagen = this.querySelector("imagen-estrella").shadowRoot.querySelector("img");
            const texto = this.querySelector("imagen-estrella").shadowRoot.querySelector(".texto");
            
            
            texto.textContent= "Perdiste";
            imagen.setAttribute("src", estrellaPerdedora)        
        }
    
        const boton = this.querySelector('boton-component').shadowRoot.querySelector('.boton');
        boton.addEventListener("click",(e)=>{
                Router.go("/instrucciones")
        });
        
        
        
         
    }

}

customElements.define("resultado-page", initResultado);