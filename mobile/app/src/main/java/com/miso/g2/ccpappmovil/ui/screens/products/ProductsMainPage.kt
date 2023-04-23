package com.miso.g2.ccpappmovil.ui.screens

import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.ui.screens.products.ProductsAppBar

@Composable
fun ProductsMainPage(navController: NavController) {
    ProductsAppBar(navController)
}