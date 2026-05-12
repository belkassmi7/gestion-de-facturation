<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\FactureController;
use App\Http\Controllers\Api\PaiementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('clients', ClientController::class);
Route::apiResource('factures', FactureController::class);
Route::apiResource('paiements', PaiementController::class);
Route::get('/paiements', [PaiementController::class, 'index']);
Route::post('/paiements', [PaiementController::class, 'store']);
