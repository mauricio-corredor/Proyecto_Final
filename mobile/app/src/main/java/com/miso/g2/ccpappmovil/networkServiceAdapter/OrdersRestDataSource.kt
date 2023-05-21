package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.OrderDetail
import okhttp3.ResponseBody
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface OrdersRestDataSource {
    @GET("orders")
    suspend fun getOrdersDetail(): MutableList<OrderDetail>

    @POST("ordenes")
    suspend fun createNewOrder(@Body order: OrderDetail): ResponseBody
}