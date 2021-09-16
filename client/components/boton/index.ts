



export function initBoton(){
    class BotonComponent extends HTMLElement{
        shadow = this.attachShadow({mode:"open"});
        constructor(){
            super()
            this.render();
        }
        render(){
            const texto = this.textContent;
            var style = document.createElement("style");
            style.textContent=
            `
            @font-face {
                font-family: "odibee";
                src: url("./../../fonts/OdibeeSans-Regular.ttf");
            }
                .boton{
                    margin-top:10px;
                    padding:10px 10px;
                    border: solid 10px #001997;
                    border-radius:10px;
                    background-color: #006CFC;
                    font-family: odibee;
                    font-size: 40px;
                    color:white;
                    cursor: pointer; 
                    max-width: 325px;
                    min-width: 325px;
                    

                }
            `


            this.shadow.appendChild(style);
            const div = document.createElement('div');
            div.innerHTML=
            `
                <button class ="boton">${texto}</button>
            `
            
            this.shadow.appendChild(div);
        }
    }
    customElements.define('boton-component', BotonComponent);
}