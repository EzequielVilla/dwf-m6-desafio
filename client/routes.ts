import { Router } from "@vaadin/router"

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  {path: '/', component: 'home-page'},//lista Falta Css
  {path: '/roomId', component: 'roomid-page'},//lista Falta CSS
  {path: '/nombre', component: 'nombre-page'},//lista Falta CSS
  {path: '/compartirId', component: 'compartirid-page'},//Lista %Falta CSS
  {path: '/instrucciones', component: 'instrucciones-page'},//Listo Falta CSS
  {path: '/espera', component: 'espera-page'},//0%
  {path: '/jugada', component: 'jugada-page'},//Retocar
  {path: '/resultado', component: 'resultado-page'},//Retocar
  {path: '/advertencia', component: 'advertencia-page'},//Falta CSS



]);


