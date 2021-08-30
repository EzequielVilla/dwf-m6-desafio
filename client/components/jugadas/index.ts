
export function initJugadas(){
    class JugadasComponent extends HTMLElement{
        shadow = this.attachShadow({mode: "open"});
        constructor(){
            super();
            this.render();
        }
        render(){

            let div = document.createElement("div");
            div.innerHTML = `
                <img src= "" alt="">
            `
            this.shadow.appendChild(div);
        }
    }
    customElements.define('jugadas-component', JugadasComponent);
}