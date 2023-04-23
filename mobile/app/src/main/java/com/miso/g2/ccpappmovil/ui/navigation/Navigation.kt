package com.miso.g2.ccpappmovil.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.miso.g2.ccpappmovil.Greeting
import com.miso.g2.ccpappmovil.ui.screens.ProductsMainPage
import com.miso.g2.ccpappmovil.ui.screens.homePage.homePage

@Composable
fun navigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = ScreensRoute.HomePage.route) {
        composable(ScreensRoute.HomePage.route) {
            homePage(navController)
        }
        composable(ScreensRoute.ProductsMainPage.route) {
            ProductsMainPage(navController)
        }
        composable(ScreensRoute.Greeting.route) {
            Greeting(navController)
        }
    }
}