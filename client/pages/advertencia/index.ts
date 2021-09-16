import { Router } from "@vaadin/router";
import { state } from "../../state";

class initAdvertencia extends HTMLElement{
    connectedCallback(){
        state.refreshHandler();     

        this.render();
        document.querySelector(".boton-comp").addEventListener("click", (e)=>{
            Router.go("/");
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
                .texto{
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
            <p class ="texto">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</p>
            <boton-component class="boton">Volver a inicio</boton-component>
            <div class="footer-comp">
                <footer-component></footer-component>
            </div>
        
    `
    this.appendChild(style);
    this.querySelector(".boton").addEventListener("click", (e)=>{
        e.preventDefault();
        Router.go("/");
    })        
    }
}

customElements.define("advertencia-page",initAdvertencia)