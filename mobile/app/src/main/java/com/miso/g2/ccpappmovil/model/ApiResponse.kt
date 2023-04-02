package com.miso.g2.ccpappmovil.model

data class ApiResponse(
    val results: List<Results> = emptyList()
)

data class Results(
    val productDetail: ProductDetail?
)