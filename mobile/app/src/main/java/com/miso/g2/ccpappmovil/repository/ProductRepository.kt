package com.miso.g2.ccpappmovil.repository

import android.util.Log
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.ProductRestDataSource
import javax.inject.Inject

interface ProductRepository {
    suspend fun getProduct(productId: String): ProductDetail
}

class ProductRepositoryImp @Inject constructor(private val dataSource: ProductRestDataSource) : ProductRepository {
    override suspend fun getProduct(productId:String): ProductDetail {
        Log.d("Product_Repository1", productId)
        var recuperado=dataSource.getProductDetail(productId)
        Log.d("Product_repository2",recuperado.toString())
        return recuperado
    }
}