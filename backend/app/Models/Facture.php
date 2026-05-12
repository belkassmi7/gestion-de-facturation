<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
   protected $fillable = [
    'client_id',
    'montantHT',
    'tva',
    'date',
    'echeance',
    'totalPaye'
];
public function client()
{
    return $this->belongsTo(Client::class);
}
public function paiements()
{
    return $this->hasMany(Paiement::class);
}
}
