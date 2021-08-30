import { state } from "../../state";

export function initCuadro(){
    class CuadroComponent extends HTMLElement{
        shadow = this.attachShadow({mode:"open"});
        constructor(){
            super()
            this.render();
        }
        render(){
            const lastState = JSON.parse(localStorage.getItem("score"));
            console.log(lastState);
            
            var style = document.createElement("style");
            style.textContent=
            `
            @font-face {
                font-family: "odibee";
                src: url("./../../fonts/OdibeeSans-Regular.ttf");
            }
            .cuadro{
                z-index: 1;
                background-color: white;
                border: solid 10px black;
                box-sizing: border-box;
                border-radius: 10px;
                width: 255px;
                height: 215px;
            }
            .cuadro__titulo{
                font-size:50px;
                font-family:"odibee";
                margin:0px;
                text-align: center;
            }
            .cuadro__usuario{
                padding-right: 10px;
                margin:0px;
                margin-top:10px;
                font-size:35px;
                font-family:"odibee";
                text-align:right;
            }
            .cuadro__pc{
                padding-right: 10px;
                margin:0px;
                font-size:35px;
                font-family:"odibee";
                text-align:right;
            }

            `


            this.shadow.appendChild(style);
            const div = document.createElement('div');
            div.innerHTML=
            `
            <div class="cuadro">
                <p class="cuadro__titulo">Score</p>\
                <p class="cuadro__usuario"> Vos: ${lastState.usuario}</p>
                <p class="cuadro__pc"> Maquina: ${lastState.pc}</p>
            </div>
            `
            
            this.shadow.appendChild(div);
        }
    }
    customElements.define('cuadro-component', CuadroComponent);
}