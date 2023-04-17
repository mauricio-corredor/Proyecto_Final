package com.miso.g2.ccpappmovil.repository

import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.RestDataSource
import javax.inject.Inject

interface ProductsRepository {
    suspend fun getProducts(): MutableList<ProductDetail>
}

class ProductsRepositoryImp @Inject constructor(private val dataSource: RestDataSource) : ProductsRepository {
    override suspend fun getProducts(): MutableList<ProductDetail> {
        return dataSource.getProductsDetail()
    }
}
