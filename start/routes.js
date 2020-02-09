'use strict'

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
const Route = use('Route')

//Routes Users
Route.post('/users', 'UserController.store').validator('User/store')

// Routes Sessions
Route.post('/sessions', 'SessionController.store').validator('Session')

// Route Forgot Password
Route.post('/forgot-passoword', 'ForgotPasswordController.store')
Route.put('/forgot-passoword', 'ForgotPasswordController.update')


Route.get('/flux', 'GeoProcessController.getFlux')

// Authenticated only
Route.group (() => {
    // Routes File
    Route.get('/files/:id', 'FileController.show')
    Route.post('/files', 'FileController.store')

    Route.get('/avatar-equipment-type/:id', 'FileController.showEquipmentTypes')
    Route.post('/avatar-equipment-type', 'FileController.storeEquipmentTypes')

    //Routes Session
    Route.get('/sessions/currentUser', 'SessionController.currentUser')
    Route.post('/sessions/revokeToken', 'SessionController.revokeToken')
    //Routes Session

    //Routes Users
    Route.get('/users', 'UserController.index')
    Route.get('/users-mechanical', 'UserController.indexSelectMechanical')
    Route.get('/users-active', 'UserController.indexActive')
    Route.get('/users/:id', 'UserController.show')
    Route.put('/users/:id', 'UserController.update').validator('User/update')
    Route.delete('/users/:id', 'UserController.destroy')
    //Routes Users

    // Routes Equipaments
    //equipaments
    Route.get('/equipments', 'EquipmentController.index')
    Route.get('/equipments-select-tag', 'EquipmentController.indexSelectTag')
    Route.get('/equipments-select-tag-not-in-maintenance', 'EquipmentController.indexSelectTagNoInMaintenance')
    Route.get('/equipments/:id', 'EquipmentController.show')
    Route.post('/equipments', 'EquipmentController.store').validator('EquipmentRenting')
    Route.put('/equipments/:id', 'EquipmentController.update').validator('EquipmentRenting')
    Route.delete('/equipments/:id', 'EquipmentController.destroy')
    //equipaments

    //equipament-renting
    Route.get('/equipment-renting', 'EquipmentRentingController.index')
    Route.get('/equipment-renting/:id', 'EquipmentRentingController.show')
    Route.post('/equipment-renting', 'EquipmentRentingController.store').validator('EquipmentRenting')
    Route.put('/equipment-renting/:id', 'EquipmentRentingController.update').validator('EquipmentRenting')
    Route.delete('/equipment-renting/:id', 'EquipmentRentingController.destroy')
    //equipament-renting

    //equipament-classifications
    Route.get('/equipment-classifications', 'EquipmentClassificationController.index')
    Route.get('/equipment-classifications/:id', 'EquipmentClassificationController.show')
    Route.post('/equipment-classifications', 'EquipmentClassificationController.store').validator('EquipmentClassification')
    Route.put('/equipment-classifications/:id', 'EquipmentClassificationController.update').validator('EquipmentClassification')
    Route.delete('/equipment-classifications/:id', 'EquipmentClassificationController.destroy')
    //equipament-classifications

    //equipment-brand
    Route.get('/equipment-brand', 'EquipmentBrandController.index')
    Route.get('/equipment-brand/:id', 'EquipmentBrandController.show')
    Route.post('/equipment-brand', 'EquipmentBrandController.store').validator('EquipmentBrand')
    Route.put('/equipment-brand/:id', 'EquipmentBrandController.update').validator('EquipmentBrand')
    Route.delete('/equipment-brand/:id', 'EquipmentBrandController.destroy')
    //equipment-brand

    //equipment-proprietary
    Route.get('/equipment-proprietary', 'EquipmentProprietaryController.index')
    Route.get('/equipment-proprietary/:id', 'EquipmentProprietaryController.show')
    Route.post('/equipment-proprietary', 'EquipmentProprietaryController.store').validator('EquipmentProprietary')
    Route.put('/equipment-proprietary/:id', 'EquipmentProprietaryController.update').validator('EquipmentProprietary')
    Route.delete('/equipment-proprietary/:id', 'EquipmentProprietaryController.destroy')
    //equipment-proprietary

    //Maintenance
    Route.get('/maintenance-equipments', 'MaintenanceEquipmentController.getMaintenanceEquipments')
    Route.post('/maintenance-equipments', 'MaintenanceEquipmentController.store')

    //Maintenance Failure Class
    Route.get('/maintenance-failure-class/:id', 'MaintenanceFailureClassController.show')
    Route.get('/maintenance-failure-class-time-category', 'MaintenanceFailureClassController.showFailureClassTimeCategory')
    //Maintenance Failure Class

    //Maintenance Occorrence
    Route.get('/maintenance-ocorrence-by-type', 'OccurrenceController.indexOcorrenceByMaintenanceType')
    //Maintenance Occorrence

    //Maintenance Release
    Route.post('/maintenance-release', 'MaintenanceReleaseController.store')
    //Maintenance Release

     //Maintenance Item
     Route.get('/maintenance-items', 'MaintenanceItemController.showMaintenanceItemByClasseFalhaIDByEquipamentoModeloID')
     //Maintenance Item

    //Maintenance Reason
    Route.get('/maintenance-reason', 'MaintenanceReasonController.indexAll')
    //Maintenance Reason

    //Maintenance Order
    Route.get('/maintenance-order', 'MaintenanceOrderController.showMaintenanceOrdersByEquipmentIDByCategoryTimeID')
    //Maintenance Order

    //Maintenance Detailing
    Route.post('/maintenance-detailing', 'MaintenanceDetailingController.store')
    //Maintenance Detailing

    //Maintenance


}).middleware(['auth'])

Route.group(() => {
    Route.get('/test', ({ response }) => response.send({ ok: true }))
    Route.get('/equipments', 'EquipmentController.index')
    Route.get('/equipments/initial-load', 'EquipmentController.initialLoad')
    Route.get('/equipments/file-download', 'EquipmentController.fileDownload')
    Route.delete('/equipments/file-download', 'EquipmentController.fileDownloadDelete')

    Route.get('/geo-process/coords', 'GeoProcessController.getCoords')
    Route.get('/geo-process/position', 'GeoProcessController.getPosition')
}).prefix('api/v1')
