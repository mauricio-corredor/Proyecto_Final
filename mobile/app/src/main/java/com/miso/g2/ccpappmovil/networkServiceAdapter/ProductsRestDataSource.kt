package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.model.ProductDetail
import retrofit2.http.GET
import retrofit2.http.Path

interface ProductsRestDataSource {
    @GET("productos/{productId}")
    suspend fun getProductDetail(@Path("productId") productId: String): ProductDetail
    //fun getProductDetail(productId:String): ProductDetail
    //suspend fun getProductDetail(@Path("productId") productId: String): MutableList<ProductDetail>
    //suspend fun getProductDetail(productId: String): MutableList<ProductDetail>

    @GET("productos")
    suspend fun getProductsDetail(): MutableList<ProductDetail>

}