package com.miso.g2.ccpappmovil.model

//https://fakestoreapi.com/products

data class ProductDetail(
    val id: Int,
    val title: String,
    val price: Float,
    val description: String,
    val category: String,
    val image: String,
)