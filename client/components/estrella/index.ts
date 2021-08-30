

export function initEstrella(){
    class EstrellaComponent extends HTMLElement{
        shadow = this.attachShadow({mode: "open"});
        constructor(){
            super();
            this.render();
        }
        render(){
            const style = document.createElement("style");
            let div = document.createElement("div");
            style.textContent=`
            .img {
                position:relative;
                z-index:0;      
            }
            .texto {
                position:absolute;
                z-index:1;  
                top:13%;
                padding-left:45px;

                margin-top:1023px;
                
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                color: white;
                font-size: 45px;
                margin: 0px;                
            }
            `
            div.innerHTML = `
            <div>
                <p class="texto"></p>
                <img class="img" src= "" alt="">
            </div>
            `
            this.shadow.appendChild(div);
            this.shadow.appendChild(style);
        }
    }
    customElements.define('imagen-estrella', EstrellaComponent);
}