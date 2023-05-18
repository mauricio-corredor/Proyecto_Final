package com.miso.g2.ccpappmovil.ui.screens.products

import android.graphics.Paint.Style
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.miso.g2.ccpappmovil.MyApplication.Companion.salesmanDefault
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.ui.navigation.ScreensRoute
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain

@Composable
fun NavigationBar(navController: NavController, tittleBar: String) {

    val contextForToast = LocalContext.current.applicationContext

    Column() {
        Box(
            modifier = Modifier
                .height(25.dp)
                .fillMaxWidth()
                .background(color = BackgroundMain)
        ) {
            Column() {
                Text(
                    text = salesmanDefault.nombre,
                    style = MaterialTheme.typography.caption,
                    fontSize=9.sp,
                    color = Color.White,
                    modifier = Modifier.padding(start = 16.dp),
                 )
                Text(
                    text = salesmanDefault.localizacion.printableName + ", " + salesmanDefault.ciudad,
                    style = MaterialTheme.typography.caption,
                    fontSize=7.sp,
                    color = Color.LightGray,
                    modifier = Modifier.padding(start = 16.dp)
                )
            }
        }

        Box(
            modifier = Modifier
                .height(40.dp)
                .fillMaxWidth()
                .background(color = BackgroundMain)
        ) {
            Row(modifier = Modifier.matchParentSize()) {
                Image(
                    painter = painterResource(id = R.drawable.logo_ccp_fondo_blanco),
                    contentDescription = R.string.ccp_logo_content.toString(),
                    modifier = Modifier
                        .size(37.dp)
                        .align(Alignment.CenterVertically)
                        .padding(4.dp)
                )
                Text(
                    text = tittleBar,
                    style = MaterialTheme.typography.subtitle1,
                    color = Color.White,
                    modifier = Modifier.align(Alignment.CenterVertically)
                )
                Spacer(Modifier.size(20.dp))
                IconButton(onClick = {
                    //Toast.makeText(contextForToast, "Ir al consulta de ordenes", Toast.LENGTH_SHORT).show()
                    navController.navigate(ScreensRoute.OrdersMainPage.route)
                }) {
                    Icon(
                        imageVector = Icons.Outlined.List,
                        contentDescription = stringResource(id = R.string.go_to_orders_query),
                        tint = Color.White
                    )
                }
                IconButton(onClick = {
                    //Toast.makeText(contextForToast, "Ir al consulta de productos", Toast.LENGTH_SHORT).show()
                    navController.navigate(ScreensRoute.ProductsMainPage.route)
                }) {
                    Icon(
                        imageVector = Icons.Outlined.Search,
                        contentDescription = stringResource(id = R.string.go_to_products_query),
                        tint = Color.White
                    )
                }
                IconButton(onClick = {
                    //Toast.makeText(contextForToast, "Ir a carrito de compras", Toast.LENGTH_SHORT).show()
                    navController.navigate(ScreensRoute.ShoppingCartPage.route)
                }) {
                    Icon(
                        imageVector = Icons.Filled.ShoppingCart,
                        contentDescription = stringResource(id = R.string.go_to_shopping_cart),
                        tint = Color.White
                    )
                }
                IconButton(onClick = {
                    //Toast.makeText(contextForToast, "Ir a pantalla home", Toast.LENGTH_SHORT).show()
                    navController.navigate(ScreensRoute.HomePage.route)
                }) {
                    Icon(
                        imageVector = Icons.Filled.Home,
                        contentDescription = stringResource(id = R.string.go_to_home_page),
                        tint = Color.White
                    )
                }
            }
        }
    }
}

@Preview
@Composable
fun PreviewNavigationBar() {
    val navController = rememberNavController()
    val tittleBar = stringResource(id = R.string.shoppingcart_page)
    NavigationBar(navController = navController, tittleBar)
}