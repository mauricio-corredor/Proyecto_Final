package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.model.ProductDetail
import retrofit2.http.GET
import retrofit2.http.Path

interface ProductRestDataSource {
    @GET("productos/{productId}")
    suspend fun getProductDetail(@Path("productId") productId: String): ProductDetail
}