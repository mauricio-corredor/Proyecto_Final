package com.miso.g2.ccpappmovil.ui.screens.orders

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
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.ui.navigation.ScreensRoute
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain

@Composable
fun OrdersAppBar(navController: NavController, textBar:String) {

    val contextForToast = LocalContext.current.applicationContext
    Box(
        modifier = Modifier
            .height(40.dp)
            .fillMaxWidth()
            .background(color = BackgroundMain)
    ) {
        Row() {
            Image(
                painter = painterResource(id = R.drawable.logo_ccp_fondo_blanco),
                contentDescription = "Logo de CCP",
                modifier = Modifier
                    .size(37.dp)
                    .align(Alignment.CenterVertically)
                    .padding(4.dp)
            )
            Text(
                text = textBar,
                style = MaterialTheme.typography.subtitle1,
                color = Color.White,
                modifier = Modifier.align(Alignment.CenterVertically)
            )
            Spacer(Modifier.size(20.dp))
            IconButton(onClick = {
                Toast.makeText(contextForToast, "Ir al consulta de ordenes", Toast.LENGTH_SHORT).show()
                navController.navigate(ScreensRoute.OrdersMainPage.route)
            }) {
                Icon(
                    imageVector = Icons.Outlined.List,
                    contentDescription = "Ir al consulta de ordenes",
                    tint = Color.White
                )
            }
            IconButton(onClick = {
                Toast.makeText(contextForToast, "Ir al consulta de productos", Toast.LENGTH_SHORT).show()
                navController.navigate(ScreensRoute.ProductsMainPage.route)
            }) {
                Icon(
                    imageVector = Icons.Outlined.Search,
                    contentDescription = "Ir al consulta de productos",
                    tint = Color.White
                )
            }
            IconButton(onClick = {
                Toast.makeText(contextForToast, "Ir a carrito de compras", Toast.LENGTH_SHORT).show()
                navController.navigate(ScreensRoute.ActiveOrderPage.route)
            }) {
                Icon(
                    imageVector = Icons.Filled.ShoppingCart,
                    contentDescription = "Ir a carrito de compras",
                    tint = Color.White
                )
            }
            IconButton(onClick = {
                Toast.makeText(contextForToast, "Ir a pantalla home", Toast.LENGTH_SHORT).show()
                navController.navigate(ScreensRoute.HomePage.route)
            }) {
                Icon(
                    imageVector = Icons.Filled.Home,
                    contentDescription = "Ir a pantalla home",
                    tint = Color.White
                )
            }
        }
    }
}