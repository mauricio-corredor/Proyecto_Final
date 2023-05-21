package com.miso.g2.ccpappmovil.repository

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.OrdersRestDataSource
import okhttp3.ResponseBody
import javax.inject.Inject

interface OrdersRepository {
    suspend fun getOrders(): MutableList<OrderDetail>
    suspend fun sendOrder(order: OrderDetail): ResponseBody
}

class OrdersRepositoryImp @Inject constructor(private val dataSource: OrdersRestDataSource) : OrdersRepository {
    override suspend fun getOrders(): MutableList<OrderDetail> {
        return dataSource.getOrdersDetail()
    }

    override suspend fun sendOrder(order: OrderDetail): ResponseBody {
        return dataSource.createNewOrder(order)
    }
}