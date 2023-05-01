package com.miso.g2.ccpappmovil.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.text.input.TextFieldValue
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.miso.g2.ccpappmovil.Greeting
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.ui.screens.ProductsMainPage
import com.miso.g2.ccpappmovil.ui.screens.homePage.homePage
import com.miso.g2.ccpappmovil.ui.screens.orders.ActiveOrderPage
import com.miso.g2.ccpappmovil.ui.screens.orders.OrdersMainPage
import com.miso.g2.ccpappmovil.ui.screens.products.AddProductToOrderForm

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
        composable(ScreensRoute.OrdersMainPage.route) {
            OrdersMainPage(navController)
        }
        composable(ScreensRoute.ActiveOrderPage.route) {
            ActiveOrderPage(navController)
        }
        composable(ScreensRoute.AddProductToOrder.route, arguments = listOf(
            navArgument("productCode") { type = NavType.StringType },
            navArgument("productDesc") { type = NavType.StringType },
            navArgument("productAvai") { type = NavType.StringType }
        )
        ) { navBackStackEntry ->
            // Extracting exact values and passing it to Profile() screen
            val productCode = navBackStackEntry.arguments?.getString("productCode")
            val productDesc = navBackStackEntry.arguments?.getString("productDesc")
            val productAvai = navBackStackEntry.arguments?.getString("productAvai")
            val textState = remember { mutableStateOf(TextFieldValue("")) }
            if (productCode != null) {
                if (productDesc != null) {
                    if (productAvai != null) {
                        AddProductToOrderForm(
                            navController = navController,
                            productCode = productCode,
                            productDesc = productDesc,
                            productAvai = productAvai,
                            textState
                        )
                    }
                }
            }
        }
    }
}
