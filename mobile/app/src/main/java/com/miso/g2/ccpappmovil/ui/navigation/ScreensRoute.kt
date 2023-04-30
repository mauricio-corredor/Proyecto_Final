package com.miso.g2.ccpappmovil.ui.navigation

enum class ScreensRoute(val route: String) {
    HomePage("home_page"),
    ProductsMainPage("products_main_page"),
    Greeting("greeting"),
    OrdersMainPage("orders_page"),
    ActiveOrderPage("active_order_page"),
    AddProductToOrder("add_product_to_order/{productCode}/{productDesc}/{productAvai}")
}