package com.miso.g2.ccpappmovil.networkServiceAdapter

import com.miso.g2.ccpappmovil.model.OrderDetail
import retrofit2.http.GET

interface OrdersRestDataSource {
    @GET("orders")
    suspend fun getOrdersDetail(): MutableList<OrderDetail>
}