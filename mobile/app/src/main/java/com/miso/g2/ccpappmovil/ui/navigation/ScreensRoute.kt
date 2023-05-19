package com.miso.g2.ccpappmovil.ui.navigation

enum class ScreensRoute(val route: String) {
    HomePage("home_page"),
    ProductsMainPage("products_main_page"),
    ExitApp("exit_app"),
    OrdersMainPage("orders_page"),
    ActiveOrderPage("active_order_page"),
    ShoppingCartPage("shopping_cart"),
    AddProductToOrder("add_product_to_order/{productCode}/{productDesc}/{productAvai}"),
    ProductViewDetailPage("product_view_detail_page/{productId}"),
    ConfigPage("config_page")
}