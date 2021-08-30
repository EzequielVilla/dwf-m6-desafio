import { Router } from "@vaadin/router"

const router = new Router(document.querySelector('.root'));
router.setRoutes([
         {path: '/', component: 'home-page'},//lista
  {path: '/roomId', component: 'roomid-page'},//10%
  {path: '/nombre', component: 'nombre-page'},//0%
  {path: '/compartirId', component: 'compartirid-page'},//0%
  {path: '/instrucciones', component: 'instrucciones-page'},//ok
  {path: '/espera', component: 'espera-page'},//0%
  {path: '/jugada', component: 'jugada-page'},//ok
  {path: '/resultado', component: 'resultado-page'},//ok

]);


