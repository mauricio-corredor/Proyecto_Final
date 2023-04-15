package com.miso.g2.ccpappmovil.model

//http://lb-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81
data class OrderDetail(
    val proveedor: String,
    val fabricanteProducto: String,
    val volumenProducto: String,
    val tipoProducto: String,
    val fechaVencimiento: String,
)

//data class OrderDetail(
//    val idOrder: String,
//    val orderNumber: String,
//    val orderCountrySale: String,
//    val orderCustomer:String,
//    val orderSeller:String,
//    val orderProductList: List<ProductDetail>,
//    val orderStatus:String
//)