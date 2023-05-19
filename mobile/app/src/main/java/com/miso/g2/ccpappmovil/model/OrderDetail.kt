package com.miso.g2.ccpappmovil.model
//http://lb-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81

data class OrderDetail(
    val numeroOrden: String,
    val clienteDetalle: ClienteDetalle,
    val vendedorDetalle: VendedorDetalle,
    val resumenOrden: ResumenOrden,
    val estadoOrden: EstadoOrden,
    val productosOrden: List<ProductoOrden>
)

data class ClienteDetalle(
    val nombre: String,
    val direccion: String,
    val telefono: String
)

data class VendedorDetalle(
    val pais: String,
    val nombre: String
)

data class ResumenOrden(
    val subtotal: Float,
    val impuestos: Float,
    val total: Float
)

enum class EstadoOrden (val printableName : String) {
    EN_PROCESO("En proceso"),
    PROCESADA("Procesada"),
    CANCELADA("Cancelada")
}

data class ProductoOrden(
    val idProducto: String,
    val codigoProducto: String,
    val descripcionProducto: String,
    val cantidadVendida: Int,
    val precioProducto: Float,
    val valorTotal: Float
)


//data class OrderDetail(
//    val proveedor: String,
//    val fabricanteProducto: String,
//    val volumenProducto: String,
//    val tipoProducto: String,
//    val fechaVencimiento: String,
//)