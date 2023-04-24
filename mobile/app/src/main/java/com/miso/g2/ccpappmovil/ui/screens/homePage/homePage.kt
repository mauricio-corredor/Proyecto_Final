package com.miso.g2.ccpappmovil.ui.screens.homePage

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.ui.navigation.ScreensRoute
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.backgroundSecondary


@Composable
fun homePage(navController: NavController) {
    Box(
        modifier = Modifier
            .background(color = BackgroundMain)
            .fillMaxSize()
    ) {
        Column {
            upHomeBar()
            logoHomeBox()

            Row(
                modifier = Modifier
                    .padding(10.dp)
                    .align(Alignment.CenterHorizontally)
            ) {
                homeButton(
                    nameButton = "Ver Productos",
                    backgroundSecondary,
                    navController,
                    ScreensRoute.ProductsMainPage.route,
                    Icons.Filled.Search
                )
                Spacer(modifier = Modifier.size(20.dp))
                homeButton(
                    nameButton = "Crear orden",
                    backgroundSecondary,
                    navController,
                    ScreensRoute.Greeting.route,
                    Icons.Filled.ShoppingCart
                )
            }
            Row(
                modifier = Modifier
                    .padding(10.dp)
                    .align(Alignment.CenterHorizontally)
            ) {
                homeButton(
                    nameButton = "Ver Ordenes",
                    backgroundSecondary,
                    navController,
                    ScreensRoute.Greeting.route,
                    Icons.Filled.List
                )
                Spacer(modifier = Modifier.size(20.dp))
                homeButton(
                    nameButton = "Salir",
                    Color.Red,
                    navController,
                    ScreensRoute.Greeting.route,
                    Icons.Filled.ExitToApp
                )
            }
            Spacer(modifier = Modifier.size(20.dp))

            lowHomeBar()
        }
    }
}

@Composable
fun homeButton(
    nameButton: String,
    colorButton: Color,
    navController: NavController,
    destination: String,
    iconVector: ImageVector
) {
    Column() {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .height(125.dp)
                .width(125.dp)
                .background(color = colorButton)
                .clickable { navController.navigate(destination) }
        ) {
            Icon(
                imageVector = iconVector,
                contentDescription = nameButton,
                tint = Color.White
            )
        }
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .height(25.dp)
                .width(125.dp)
                .background(color = colorButton)
        )
        {
            Text(
                text = nameButton,
                style = MaterialTheme.typography.caption,
                color = Color.White
            )
        }
    }
}