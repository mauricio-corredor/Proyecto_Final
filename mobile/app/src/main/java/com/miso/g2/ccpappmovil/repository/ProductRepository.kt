package com.miso.g2.ccpappmovil.repository

import android.util.Log
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.RestDataSource
import javax.inject.Inject

interface ProductRepository {
    suspend fun getProduct(productId:String): ProductDetail
}

class ProductRepositoryImp @Inject constructor(private val dataSource: RestDataSource) : ProductRepository {
    override suspend fun getProduct(productId: String): ProductDetail {
        Log.d("Probe ProductRepImp",productId.toString())
        return dataSource.getProductDetail(productId)
    }
}
