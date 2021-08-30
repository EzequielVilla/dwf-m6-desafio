

export function initTiempo(){
    class TiempoComponent extends HTMLElement{
        shadow = this.attachShadow({mode: "open"});
        constructor(){
            super();
            this.render();
        }
        render(){
        
            const div = document.createElement("div");
            const style = document.createElement("style");
            style.textContent=`
                .full-circle{
                    width: 200px;
                    height:200px;
                    border: 15px solid;
                    border-radius: 50%;
                    position: relative;
                    
                }
                .contador{
                    position: absolute;
                    font-size: 100px;
                    
                    margin: 0px;
                    top: 40px;
                    left: 70px;
                }
                .
               
            `
            this.shadow.appendChild(style);
            div.innerHTML = `
                <div class="full-circle"> 
                    <p class="contador"></p>
                </div>
            `
            this.shadow.appendChild(div);
            
        }

        
    }
    customElements.define('tiempo-component', TiempoComponent);
}
    