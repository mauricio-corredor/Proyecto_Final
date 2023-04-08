package com.miso.g2.ccpappmovil.repository

import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.RestDataSource
import javax.inject.Inject

interface ProductRepository {
    suspend fun getProduct(): ProductDetail
}

class ProductRepositoryImp @Inject constructor(private val dataSource: RestDataSource) : ProductRepository {
    override suspend fun getProduct(): ProductDetail {
        return dataSource.getProductDetail()
    }
}
