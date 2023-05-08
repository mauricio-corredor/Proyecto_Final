package com.miso.g2.ccpappmovil.ui.screens.shoppingCart

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.model.CartItemArticleDetail
import com.miso.g2.ccpappmovil.ui.screens.products.NavigationBar

@Composable
fun ShoppingCartMainPage(navController: NavController) {

    //cambiar cuando se tenga el view model de ordenes
    Column {
        NavigationBar(navController = navController, tittleBar = stringResource(id = R.string.shoppingcart_page) )
        //CartAppBar(navController)
        
        //Lista de carrito de pruebas
        val articlesOnCart: MutableList<CartItemArticleDetail> = mutableListOf()
        val articleOne = CartItemArticleDetail(
            "62544cad-3dfd-42b1-bc4d-18c09dfdaaf1",
            "Articulo de prueba 1",
            "https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SL1500_.jpg",
            "Computers",
            "MOCK1",
            150.9F,
            2
        )
        val articleTwo = CartItemArticleDetail(
            "62544cad-3dfd-42b1-bc4d-18c09dfdaaf2",
            "Articulo de prueba 2",
            "https://m.media-amazon.com/images/I/61pUul1oDlL._AC_SL1500_.jpg",
            "Accessories",
            "MOCK1",
            33.5F,
            1
        )
        articlesOnCart.add(articleOne)
        articlesOnCart.add(articleTwo)
        //
        
        ShoppingCartList(carItemList = articlesOnCart)

    }
}