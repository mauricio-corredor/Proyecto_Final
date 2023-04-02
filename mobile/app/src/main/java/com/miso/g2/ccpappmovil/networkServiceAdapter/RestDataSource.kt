package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.ApiResponse
import com.miso.g2.ccpappmovil.model.ProductDetail
import retrofit2.http.GET

interface RestDataSource {
    @GET("/products/1")
    //suspend fun getProductDetail(): ApiResponse
    suspend fun getProductDetail(): ProductDetail

}