package com.miso.g2.ccpappmovil.ui.screens.shoppingCart

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.Divider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.miso.g2.ccpappmovil.model.CartItemArticleDetail
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.ui.screens.products.NavigationBar


@Composable
fun ShoppingCartMainPage(navController: NavController) {
    Box(
        modifier = Modifier
            .background(color = BackgroundMain)
            .fillMaxSize()
    ) {
        //cambiar cuando se tenga el view model de ordenes
        Column {
            NavigationBar(navController = navController, tittleBar = stringResource(id = R.string.shoppingcart_page))
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
            ShoppingCartList(carItemList = articlesOnCart)
            var subTotalPrice: Float = (0.0F)

            for (i in articlesOnCart.indices) {
                subTotalPrice = articlesOnCart[i].precioProducto * articlesOnCart[i].cantidadArticulos
            }
            Log.d("prueba barra de precio", subTotalPrice.toString())
            totalPriceBar(subTotalPrice)
        }
    }
}

@Preview
@Composable
fun PreviewShoppingCartMainPage() {
    val navController = rememberNavController()
    ShoppingCartMainPage(navController)
}

@Composable
fun totalPriceBar(subTotalOrderValue: Float) {
    Column() {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(5.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.End
        ) {
            Text(
                text = stringResource(R.string.shopping_cart_subtotal_label),
                style = MaterialTheme.typography.subtitle1,
                color = Color.White
            )
            Text(
                text = stringResource(R.string.cart_price, subTotalOrderValue.toString()),
                style = MaterialTheme.typography.subtitle1,
                color = Color.Yellow,
                textDecoration = TextDecoration.Underline
            )
        }
        Row(
            modifier = Modifier
                //.fillParentMaxWidth()
                .fillMaxWidth()
                .padding(5.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.End
        ) {
            Text(
                text = stringResource(R.string.shopping_cart_tax_label),
                style = MaterialTheme.typography.subtitle1,
                color = Color.White
            )
            Text(
                text = stringResource(R.string.cart_price, subTotalOrderValue.toString()),
                style = MaterialTheme.typography.subtitle1,
                color = Color.Yellow,
                textDecoration = TextDecoration.Underline
            )
        }
        Row(
            modifier = Modifier
                //.fillParentMaxWidth()
                .fillMaxWidth()
                .padding(5.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.End
        ) {
            Text(
                text = stringResource(R.string.shopping_cart_total_label),
                style = MaterialTheme.typography.subtitle1,
                color = Color.White
            )
            Text(
                text = stringResource(R.string.cart_price, subTotalOrderValue.toString()),
                style = MaterialTheme.typography.subtitle1,
                color = Color.Yellow,
                textDecoration = TextDecoration.Underline
            )
        }
    }
    Divider()
}