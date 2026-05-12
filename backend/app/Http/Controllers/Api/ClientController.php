<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        return Client::all();
    }

    public function store(Request $request)
    {
        return Client::create($request->all());
    }

    public function show($id)
    {
        return Client::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $client->update($request->all());
        return $client;
    }

    public function destroy($id)
    {
        return Client::destroy($id);
    }
}
