package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.CountriesCcp
import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.model.ProductDetail
import okhttp3.ResponseBody
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface OrdersRestDataSource {
    @GET("ordenes/pais/{pais}")
    suspend fun getOrdersDetail(@Path("pais") countryName: String): MutableList<OrderDetail>

    @POST("ordenes")
    suspend fun createNewOrder(@Body order: OrderDetail): ResponseBody
}