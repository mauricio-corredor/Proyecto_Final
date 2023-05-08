package com.miso.g2.ccpappmovil.ui.screens.orders

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.material.Divider
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.ui.screens.products.NavigationBar
import com.miso.g2.ccpappmovil.viewModel.ProductsViewModel

@Composable
fun OrdersMainPage(navController: NavController,viewModel: ProductsViewModel = hiltViewModel()
) {  //cambiar cuando se tenga el view model de ordenes
    Column {
        NavigationBar(navController = navController, tittleBar = stringResource(R.string.orders_page))
        //OrdersAppBar(navController,"Consulta Ordenes")
        Spacer(modifier = Modifier.size(10.dp))
        Divider()
        Text(text = "En construccion...", color = Color.White)
    }
}