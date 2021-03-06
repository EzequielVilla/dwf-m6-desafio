import { state } from "../../state";


export function initInfo(){
    class InfoComponent extends HTMLElement{
        shadow = this.attachShadow({mode:"open"});
        constructor(){
            super()
            this.render();
        }
        render(){
            const p1 = state.getState().jugador1;
            const p2 = state.getState().jugador2;
            const scoreP1 = state.getState().scoreP1;
            const scoreP2 = state.getState().scoreP2;
            const roomId = state.getState().roomId;
            var style = document.createElement("style");
            style.textContent=
            `
            @font-face {
                font-family: "odibee";
                src: url("./../../fonts/OdibeeSans-Regular.ttf");
            }
            .content{
                display:grid;
                grid-template-columns: 1fr 1fr;
            }
            .content__score{
                text-align: center;
                font-size: 24px;
                margin-left: 10px;
            }
            .content__score__p2{
                color: #FF6442;
            }       
            .content__room{
                text-align: center;
            }
            .content__room__room{
                font-weight: bold;
                font-size: 24px;
            }
            .content__room__roomid{
                margin-top:5px;
                font-size: 24px;
            }
            `
            this.shadow.appendChild(style);
            const div = document.createElement('div');
            div.innerHTML=
            `   
                <div class="content">
                    <div class="content__score">
                        <p class="content__score__p1">${p1}: ${scoreP1}</p>
                        <p class="content__score__p2">${p2}: ${scoreP2}</p>
                    </div>
                    <div  class="content__room">
                        <p class="content__room__room">Sala</p>
                        <p class="content__room__roomid">${roomId}</p>
                    </div>
                </div>
                
            `
            
            this.shadow.appendChild(div);
        }
    }
    customElements.define('info-component', InfoComponent);
}