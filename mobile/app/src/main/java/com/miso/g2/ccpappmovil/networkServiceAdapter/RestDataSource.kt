package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.model.ProductDetail
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface RestDataSource {
    @GET("/productos/{productId}")
    //fun getProductDetail(productId:String): ProductDetail
    suspend fun getProductDetail(@Path("productId") productId: String): ProductDetail

    @GET("/productos")
    suspend fun getProductsDetail(): MutableList<ProductDetail>

    //Funcion temporal para probar el endpoint de Ordenes aun en proceso de desarrollo en backend
    @GET("/productos")
    suspend fun getOrdersDetail(): MutableList<OrderDetail>
}