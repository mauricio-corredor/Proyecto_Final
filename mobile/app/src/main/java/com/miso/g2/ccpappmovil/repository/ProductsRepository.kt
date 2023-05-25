package com.miso.g2.ccpappmovil.repository

import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.ProductsRestDataSource
import javax.inject.Inject

interface ProductsRepository {
    suspend fun getInventory(countryName : String): MutableList<ProductDetail>
}

class ProductsRepositoryImp @Inject constructor(private val dataSource: ProductsRestDataSource) : ProductsRepository {
    override suspend fun getInventory(countryName: String): MutableList<ProductDetail> {
        return dataSource.getInventoryCountry(countryName)
    }
}

