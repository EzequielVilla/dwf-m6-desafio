type Jugada = "piedra" | "papel" | "tijera"
import { Router } from "@vaadin/router";
import { state } from "./../../state";


class initJugada extends HTMLElement{
    connectedCallback(){
        this.render();
        state.refreshHandler(); 
    }


    render(){
        var style = document.createElement("style");
         style.textContent=
        `      
            .comp__tiempo{
                padding: 170px 60px;
            }
            .comp__footer{
                padding: 0px 80px;
            }
    
            @media (min-width: 376px) {
    
                .comp__tiempo{
                    padding: 170px;
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                .comp__footer{
                    padding: 0px ;
                     display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            }
        `

        this.innerHTML=`
            <div class= "comp__tiempo">
                <tiempo-component></tiempo-component>
            </div>
            <div class= "comp__footer">
                <footer-component></footer-component>
            </div>
        `
    
        this.appendChild(style);
        this.cambioEstiloShadow(document.body);
        
        //selecciono los elementos del shadow para escuchar el click.
        const piedra = this.elementoJugada("piedra", document.body);
        const papel = this.elementoJugada("papel", document.body);
        const tijera = this.elementoJugada("tijera", document.body);
        this.contador(document.body);
        this.escuchoClick(piedra);
        this.escuchoClick(papel);
        this.escuchoClick(tijera);          
        
        
    } 

     elementoJugada(jugada:Jugada ,containerEl:Element):Element{    
         
        return this.querySelector('footer-component').shadowRoot.querySelector(`.${jugada}`);
    }
     cambioEstiloShadow(containerEl):void{
        
        
        const shadow = containerEl.querySelector('footer-component').shadowRoot;
        const otroEstilo = document.createElement("style");
        otroEstilo.textContent=`
        img{
            margin-right:10px;
            margin-bottom:-30px;
            cursor: pointer;
        }
        `
        shadow.appendChild(otroEstilo); 
        
        
    }
    //Actua en base a que mano se hizo click.
     escuchoClick(mano:Element):void{       
        
        mano.addEventListener("click",(e)=>{
            e.preventDefault();
            const miNombre = state.getState().miNombre;
            const p1 = state.getState().jugador1;
            const jugada = mano.getAttribute("name");
            const rtdbRoomId = state.getState().rtdbRoomId;

            if(miNombre == p1){
                state.setJugada(jugada, "jugador1", rtdbRoomId).then(res=>{
                    state.setPunto();    
                })
            } else {  
                state.setJugada(jugada, "jugador2", rtdbRoomId).then(res=>{          
                        state.setPunto();         
               })
            }
            
            
            // cambio el estilo de nuevo para que se opaquen las opciones no seleccionadas. 
            this.cambioEstiloConClick(mano,document.body);
           
        });
    }
    
    
    
    
     cambioEstiloConClick(el:Element,containerEl:Element):void{
    
        const clase = el.getAttribute('class');
        const shadow = containerEl.querySelector('footer-component').shadowRoot;
        const otroEstilo = document.createElement("style");
        otroEstilo.textContent=`
        img{
            opacity:0.7;
            margin-bottom:-70px;
            
        }
        .${clase}{
            opacity:1;
            margin-bottom: -30px; 
        }
        `
        shadow.appendChild(otroEstilo);
        setTimeout(()=>{},1000);
    }

     estiloResultadoFinal(eleccionP1:string, eleccionP2:string){
        
        
        
        
        this.innerHTML=``;    
        var style = document.createElement("style");
        
        style.textContent=
        `
        @media (min-width: 376px) {
            .pc{
                
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .usuario{
                
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
        }
    
            
        `;
        
        this.innerHTML=`
        <div class="pc">
            <footer-component class="pc__comp">h</footer-component>
        </div>
        <div class="usuario">
            <footer-component class="usuario__comp">k</footer-component> 
        </div>
        `;
        //Opaco ambos footer-component
        const dosShadows = this.querySelectorAll('footer-component');
        dosShadows.forEach(shadow => {
            const shadowRoot = shadow.shadowRoot;
            const styleShadow = document.createElement("style");
        
            styleShadow.textContent=`
            img{
                opacity: 0;
                position:fixed;              
            }
            `
            shadowRoot.appendChild(styleShadow);
        });
        //Doy estilo por separado, tanto para P1 como para P2.
        
        const miNombre = state.getState().miNombre;
        const jugador1 = state.getState().jugador1;


        //Esta seria la visual de p1, gira todo para la visual del p2
        if(miNombre == jugador1){

            const p2 = this.querySelector(".pc__comp").shadowRoot;
            const styleP2 = document.createElement("style");
            styleP2.textContent=
            `
                img{
                    padding-right:120px;
                    padding-top:95px;
                }
                .${eleccionP2}{
                    width:120px;
                    opacity:1;
                    position:initial;
                    transform: rotate(180deg);
                }
        
                @media (min-width: 376px) {
                    img{
                        
                        padding-top:95px;
                    }
                }
        
                
            `
            p2.appendChild(styleP2);
        
            const usuario = this.querySelector(".usuario__comp").shadowRoot;
            const styleUsuario = document.createElement("style");    
            styleUsuario.textContent=
            ` 
                img{
                    padding-left:120px;
                    margin-top:100px;
                }
        
                .${eleccionP1}{
                    width:120px;
                    opacity:1;
                    position:initial;
                }
                @media (min-width: 376px) {
                    img{
                        
                        padding-top:55px;
                    }
                }
            `
            usuario.appendChild(styleUsuario);    
            this.appendChild(style);
        }
        else{
            const p2 = this.querySelector(".pc__comp").shadowRoot;
            const styleP2 = document.createElement("style");
            styleP2.textContent=
            `
                img{
                    padding-right:120px;
                    padding-top:95px;
                }
                .${eleccionP1}{
                    width:120px;
                    opacity:1;
                    position:initial;
                    transform: rotate(180deg);
                }
        
                @media (min-width: 376px) {
                    img{
                        
                        padding-top:95px;
                    }
                }
        
                
            `
            p2.appendChild(styleP2);
        
            const usuario = this.querySelector(".usuario__comp").shadowRoot;
            const styleUsuario = document.createElement("style");    
            styleUsuario.textContent=
            ` 
                img{
                    padding-left:120px;
                    margin-top:100px;
                }
        
                .${eleccionP2}{
                    width:120px;
                    opacity:1;
                    position:initial;
                }
                @media (min-width: 376px) {
                    img{
                        
                        padding-top:55px;
                    }
                }
            `
            usuario.appendChild(styleUsuario);    
            this.appendChild(style);

        }
        
        





        
        
        
        
    }
    
     contador(containerEl){
        
        var tiempo = containerEl.querySelector('tiempo-component').shadowRoot.querySelector('.contador');
        tiempo.innerHTML = "3";
        const intervalo = setInterval(()=>{
            const eligioP1 = state.getState().eligioP1;
            const eligioP2 = state.getState().eligioP2;
            const eleccionP1 = state.getState().eleccionP1;
            const eleccionP2 = state.getState().eleccionP2;
            tiempo.textContent--;
            if(tiempo.textContent == 0 && (eligioP1 == false || eligioP2 == false)){
                Router.go("/instrucciones")
                clearInterval(intervalo);
            } else if(tiempo.textContent == 0 && (eligioP1 == true || eligioP2 == true)){
                this.estiloResultadoFinal(eleccionP1,eleccionP2);
            } else if(tiempo.textContent == -2){
                Router.go("/resultado");
                clearInterval(intervalo);
            }

            console.log(tiempo.textContent);
            
            
            
        },1000);
    }
}

customElements.define("jugada-page", initJugada);