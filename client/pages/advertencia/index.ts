import { Router } from "@vaadin/router";

class initAdvertencia extends HTMLElement{
    connectedCallback(){
        this.render();
    }



    render():void{

    }
}

customElements.define("advertencia-page",initAdvertencia)