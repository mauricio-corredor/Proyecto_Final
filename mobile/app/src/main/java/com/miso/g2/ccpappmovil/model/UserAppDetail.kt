package com.miso.g2.ccpappmovil.model

data class UserAppDetail(
    val nombre: String,
    val direccion: String,
    val telefono: String,
    val idiomaInteface: IdiomsCcp,
    val localizacion: CountriesCcp,
    val ciudad:CitiesCcp
)