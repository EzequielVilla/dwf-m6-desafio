import { Router } from "@vaadin/router";

class initNombre extends HTMLElement{
    connectedCallback(){
        this.render();
    }



    render():void{

    }
}

customElements.define("nombre-page",initNombre)