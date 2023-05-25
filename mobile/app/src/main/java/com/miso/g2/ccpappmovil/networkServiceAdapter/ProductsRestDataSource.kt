package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.model.ProductDetail
import retrofit2.http.GET
import retrofit2.http.Path

interface ProductsRestDataSource {
    @GET("productos")
    suspend fun getProductsDetail(): MutableList<ProductDetail>

    @GET("inventarios/{pais}")
    suspend fun getInventoryCountry(@Path("pais") countryName: String): MutableList<ProductDetail>

}