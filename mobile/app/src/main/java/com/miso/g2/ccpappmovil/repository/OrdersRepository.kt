package com.miso.g2.ccpappmovil.repository

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.OrdersRestDataSource
import okhttp3.ResponseBody
import javax.inject.Inject

interface OrdersRepository {
    suspend fun getOrders(countryName : String): MutableList<OrderDetail>
    suspend fun sendOrder(order: OrderDetail): ResponseBody
}

class OrdersRepositoryImp @Inject constructor(private val dataSource: OrdersRestDataSource) : OrdersRepository {
    override suspend fun getOrders(countryName : String): MutableList<OrderDetail> {
        return dataSource.getOrdersDetail(countryName)
    }

    override suspend fun sendOrder(order: OrderDetail): ResponseBody {
        return dataSource.createNewOrder(order)
    }
}