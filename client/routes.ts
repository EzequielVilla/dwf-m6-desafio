import { Router } from "@vaadin/router"

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  {path: '/', component: 'home-page'},
  {path: '/roomId', component: 'roomid-page'},
  {path: '/nombre', component: 'nombre-page'},
  {path: '/compartirId', component: 'compartirid-page'},
  {path: '/instrucciones', component: 'instrucciones-page'},
  {path: '/espera', component: 'espera-page'},
  {path: '/jugada', component: 'jugada-page'},
  {path: '/resultado', component: 'resultado-page'},
  {path: '/advertencia', component: 'advertencia-page'},



]);


