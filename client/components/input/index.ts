
export function initInput(){
    class InputComponent extends HTMLElement{
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
                .input-c{
                    padding:20px 20px;
                    border: solid 10px #001997;
                    border-radius:10px;
                    font-family: odibee;
                    font-size: 40px;
                    
                    
                    max-width: 325px;
                    

                }
            `


            this.shadow.appendChild(style);
            const div = document.createElement('div');
            div.innerHTML=
            `
                <input type="text" class ="input-c" placeholder="${texto}" ></input>
            `
            
            this.shadow.appendChild(div);
        }
    }
    customElements.define('input-component', InputComponent);
}