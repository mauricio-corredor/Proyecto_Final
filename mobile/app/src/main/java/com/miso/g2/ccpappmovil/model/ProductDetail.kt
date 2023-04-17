package com.miso.g2.ccpappmovil.model

//http://lb-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81
data class ProductDetail(
    val idProducto: String,
    val descripcionProducto: String,
    val imagenProducto: String,
    val proveedor: String,
    val fabricanteProducto: String,
    val volumenProducto: String,
    val tipoProducto: String,
    val fechaVencimiento: String,
    //val precioProducto: Float
)

//https://fakestoreapi.com/products
//data class ProductDetail(
//    val id: Int,
//    val title: String,
//    val price: Float,
//    val description: String,
//    val category: String,
//    val image: String,
//)