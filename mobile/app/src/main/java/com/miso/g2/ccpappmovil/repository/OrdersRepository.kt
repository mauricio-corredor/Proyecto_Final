package com.miso.g2.ccpappmovil.repository

import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.RestDataSource
import javax.inject.Inject

interface OrdersRepository {
    suspend fun getOrders(): MutableList<OrderDetail>
}

class OrdersRepositoryImp @Inject constructor(private val dataSource: RestDataSource) : OrdersRepository {
    override suspend fun getOrders(): MutableList<OrderDetail> {
        return dataSource.getOrdersDetail()
    }
}