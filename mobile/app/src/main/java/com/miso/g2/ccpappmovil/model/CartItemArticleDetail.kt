package com.miso.g2.ccpappmovil.model

data class CartItemArticleDetail(
    val idProducto: String,
    val descripcionProducto: String,
    val imagenProducto: String,
    val tipoProducto: String,
    val codigoProducto: String,
    val precioProducto: Float,
    val cantidadArticulos: Int = 0
)