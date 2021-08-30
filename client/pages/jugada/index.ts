type Jugada = "piedra" | "papel" | "tijera"
import { state } from "./../../state";

export function initJugada(param){
    
    const containerEl = document.createElement('div');
    containerEl.classList.add("inst-cont");
    const componentEl = document.createElement("div");
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
    componentEl.innerHTML=`
        <div class= "comp__tiempo">
            <tiempo-component></tiempo-component>
        </div>
        <div class= "comp__footer">
            <footer-component></footer-component>
        </div>
    `

    containerEl.appendChild(style);
    containerEl.appendChild(componentEl);

    cambioEstiloShadow(containerEl);
    
    //selecciono los elementos del shadow para escuchar el click.
    const piedra = elementoJugada("piedra", containerEl);
    const papel = elementoJugada("papel", containerEl);
    const tijera = elementoJugada("tijera", containerEl);
    
    contador(containerEl,param);
    escuchoClick(piedra,param,containerEl);
    escuchoClick(papel,param,containerEl);
    escuchoClick(tijera,param,containerEl);
    
    
    
    return containerEl;
    
}

function cambioEstiloShadow(containerEl){
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

function elementoJugada(jugada:Jugada ,containerEl:Element){    
    return containerEl.querySelector('footer-component').shadowRoot.querySelector(`.${jugada}`);
}
function escuchoClick(el:Element,param,containerEl){
    el.addEventListener("click",(e)=>{
        e.preventDefault();
        
        
        const jugada = el.getAttribute("name");
        const jugadaPc = state.configPc();
        
        state.aJugar(jugada,jugadaPc)
        console.log(state.getState());
        const lastState = state.getState();
        //cambio el estilo de nuevo
        cambioEstiloConClick(el,containerEl);
        setTimeout(()=>{estiloResultadoFinal(jugadaPc,el,containerEl);},1000);
        
        setTimeout(()=>{param.goTo("/resultado");},2000);
    });
}

function cambioEstiloConClick(el:Element,containerEl:Element){
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

function estiloResultadoFinal(jugadaPc,el:Element,containerEl:Element){
    
    containerEl.innerHTML=``;    
    const jugadaUsuario = el.getAttribute('class');
    var style = document.createElement("style");
    var nuevoCont = document.createElement("div");
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
    
    nuevoCont.innerHTML=`
    <div class="pc">
        <footer-component class="pc__comp">h</footer-component>
    </div>
    <div class="usuario">
        <footer-component class="usuario__comp">k</footer-component> 
    </div>
    `;
    //Opaco ambos footer-component
    const dosShadows = nuevoCont.querySelectorAll('footer-component');
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
    //Doy estilo por separado, tanto para pc como para usuario.
    const pc = nuevoCont.querySelector(".pc__comp").shadowRoot;
    const stylePc = document.createElement("style");
    stylePc.textContent=
    `
        img{
            padding-right:120px;
            padding-top:95px;
        }
        .${jugadaPc}{
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
    pc.appendChild(stylePc);

    const usuario = nuevoCont.querySelector(".usuario__comp").shadowRoot;
    const styleUsuario = document.createElement("style");    
    styleUsuario.textContent=
    ` 
        img{
            padding-left:120px;
            margin-top:100px;
        }

        .${jugadaUsuario}{
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
    containerEl.appendChild(style);
    containerEl.appendChild(nuevoCont);
    
    
    
}
function contador(containerEl,param){

    
    
    const boton = containerEl.querySelector('.comp__footer');
    boton.addEventListener("click", (e)=>{
        clearInterval(intervalo);
    });
    
    
    var tiempo = containerEl.querySelector('tiempo-component').shadowRoot.querySelector('.contador');
    tiempo.innerHTML = "3";
    const intervalo = setInterval(()=>{
        tiempo.textContent--;
        if(tiempo.textContent == 0){
            param.goTo("/home")
            clearInterval(intervalo);
        }
    },1000);
    
}