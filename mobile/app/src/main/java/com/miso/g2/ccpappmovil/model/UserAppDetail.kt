package com.miso.g2.ccpappmovil.model

data class UserAppDetail(
    val nombre: String,
    val direccion: String,
    val telefono: String,
    var idiomaInteface: IdiomsCcp,
    var localizacion: CountriesCcp,
    var ciudad:CitiesCcp
)