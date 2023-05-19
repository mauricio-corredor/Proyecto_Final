package com.miso.g2.ccpappmovil.repository

import android.util.Log
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.networkServiceAdapter.RestDataSource
import javax.inject.Inject

interface ProductRepository {
    suspend fun getProduct(productId: String): ProductDetail
//suspend fun getProduct(productId: String): MutableList<ProductDetail>
}

class ProductRepositoryImp @Inject constructor(private val dataSource: RestDataSource) : ProductRepository {
    override suspend fun getProduct(productId:String): ProductDetail {
    //override suspend fun getProduct(productId:String): MutableList<ProductDetail> {
        Log.d("Product_Repository1", productId)
        var recuperado=dataSource.getProductDetail(productId)
        Log.d("Product_repository2",recuperado.toString())
        return recuperado
        //return dataSource.getProductDetail(productId)
    }
}

//interface ProductRepository {
//    suspend fun getProduct(productId:String): ProductDetail
//}
//
//class ProductRepositoryImp @Inject constructor(private val dataSource: RestDataSource) : ProductRepository {
//    override suspend fun getProduct(productId: String): ProductDetail {
//        Log.d("Probe ProductRepImp",productId.toString())
//        return dataSource.getProductDetail(productId)
//    }
//}