import { Router } from "@vaadin/router";

class initCompartirId extends HTMLElement{
    connectedCallback(){
        this.render();
    }



    render():void{

    }
}

customElements.define("compartirid-page",initCompartirId);