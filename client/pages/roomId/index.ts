import { Router } from "@vaadin/router";
import { state } from "../../state";

class initRoomId extends HTMLElement{
    connectedCallback(){
        this.render();
        
        //toma el codigo que se ingresa y verifica 
        
        this.querySelector(".room").addEventListener("click",(e)=>{
            e.preventDefault();
            const id = document.querySelector(".codigo").shadowRoot.querySelector("input").value;
            const lastState = state.getState();
            state.validateRoomId(id).then((res)=>{   
                res.json().then(respuesta=>{            
                    if(respuesta.existe == true){
                        state.setState({
                            ...lastState,
                            unir : respuesta.existe,
                            roomId: id,
                            rtdbRoomId: respuesta.rtdbRoomId,
                        })     
                        Router.go("/nombre")
                    } else{
                        state.setState({
                            ...lastState,
                            unir: respuesta.existe,
                        })
                    }
                    
                })
                
            })
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
        <input-component class="codigo">código</input-component>
        <boton-component class="room">Ingresar a la sala</boton-component>
        </div>
        <div class="footer-comp">
        <footer-component></footer-component>
        </div>
        
        `
        this.appendChild(style);         
    }
}

customElements.define("roomid-page",initRoomId)