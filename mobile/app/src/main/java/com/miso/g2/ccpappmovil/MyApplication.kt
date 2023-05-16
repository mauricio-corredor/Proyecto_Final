package com.miso.g2.ccpappmovil

import android.app.Application
import com.miso.g2.ccpappmovil.model.CitiesCcp
import com.miso.g2.ccpappmovil.model.CountriesCcp
import com.miso.g2.ccpappmovil.model.IdiomsCcp
import com.miso.g2.ccpappmovil.model.UserAppDetail
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MyApplication : Application(){
    companion object{
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
    }

    override fun onCreate() {
        super.onCreate()
    }
}