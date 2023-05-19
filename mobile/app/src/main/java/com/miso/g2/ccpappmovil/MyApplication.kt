package com.miso.g2.ccpappmovil

import android.app.Application
import com.miso.g2.ccpappmovil.model.*
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MyApplication : Application() {
    companion object {
        var userDefault = UserAppDetail(
            "Alejandro Magno",
            "Av. Lourdes 4550",
            "+57 3456000111",
            IdiomsCcp.ESPAÑOL,
            CountriesCcp.COLOMBIA,
            CitiesCcp.BOGOTA
        )

        var salesmanDefault = UserAppDetail(
            "Pedro Alcantara",
            "Calle Simon Bolivar No. 4553",
            "+57 8887771234",
            IdiomsCcp.ESPAÑOL,
            CountriesCcp.COLOMBIA,
            CitiesCcp.BOGOTA
        )

        var orderProductsList: MutableList<ProductoOrden> = mutableListOf()

    }

    override fun onCreate() {
        super.onCreate()
    }
}