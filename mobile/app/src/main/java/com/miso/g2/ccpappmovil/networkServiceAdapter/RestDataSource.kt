package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.model.ProductDetail
import retrofit2.http.GET

interface RestDataSource {
    //@GET("/products/1")
    @GET("/productos/6159cea1-f8a4-408c-9227-11e4a4fdae6e")
    suspend fun getProductDetail(): ProductDetail

    //@GET("/products")
    @GET("/productos")
    suspend fun getProductsDetail(): MutableList<ProductDetail>

    //Funcion temporal para probar el endpoint de Ordenes aun en proceso de desarrollo en backend
    @GET("/productos")
    suspend fun getOrdersDetail(): MutableList<OrderDetail>
}