package com.miso.g2.ccpappmovil.model

//http://lb-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81

//http://lb-app-bodega-2115956073.us-east-1.elb.amazonaws.com:83/inventarios/{pais}

data class ProductDetail(
    val idProducto: String,
    val descripcionProducto: String,
    val imagenProducto: String,
    val proveedor: String,
    val fabricanteProducto: String,
    val volumenProducto: String,
    val tipoProducto: String,
    val fechaVencimiento: String,
    val codigoProducto: String,
    val precioProducto: Float,
    val paisInventario: String,
    val cantidadTotal: Int
)