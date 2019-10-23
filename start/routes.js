"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Instale Tecnologia DirectAPI" };
});

Route.post("/users", "UserController.create");
Route.get("/api/currentUser", "UserController.index");
Route.post("/sessions", "SessionController.create");
Route.get("/geo-process/coords", "GeoProcessController.getCoords");
Route.get("/geo-process/position", "GeoProcessController.getPosition");
Route.get("/flux", "GeoProcessController.getFlux");
