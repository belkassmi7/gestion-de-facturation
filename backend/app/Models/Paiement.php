<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;
    protected $fillable = [
    'facture_id',
    'montant',
    'date',
    'mode',
];
public function facture()
{
    return $this->belongsTo(Facture::class);
}
}
