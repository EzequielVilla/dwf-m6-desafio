import { Router } from "@vaadin/router";

class initEspera extends HTMLElement{
    connectedCallback(){
        this.render();
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
            }
            .boton-comp{
                margin: 45px 20px 65px 85px;
            }
            .footer-comp{
                margin-left:50px;
            }
            @media (min-width: 376px) {
                .titulo{
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
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
                <boton-component class="room">Ingresar a la sala</boton-component>
            </div>
            <div class="footer-comp">
                <footer-component></footer-component>
            </div>
        
    `
    this.appendChild(style);
    }
}

customElements.define("espera-page",initEspera)