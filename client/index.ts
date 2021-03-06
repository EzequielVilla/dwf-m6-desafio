import { initBoton } from "./components/boton";
import { initCuadro } from "./components/cuadro-score/cuadroScore";
import { initEstrella } from "./components/estrella";
import { initFooter } from "./components/footer";
import { initJugadas } from "./components/jugadas";
import { initTiempo } from "./components/tiempo";
import { initInput } from "./components/input";
import { initInfo } from "./components/info";

import { state } from "./state";
import "./pages/home/index";
import "./pages/roomId/index"
import "./pages/advertencia/index"
import "./pages/compartirId/index"
import "./pages/espera/index"
import "./pages/instrucciones/index"
import "./pages/jugada/index"
import "./pages/nombre/index"
import "./pages/resultado/index"
import "./routes"



function main(){
    state.initLocalStorage();
    initBoton();
    initEstrella();
    initJugadas();
    initTiempo();
    initFooter();
    initCuadro();
    initInput();
    initInfo();
}

main();
