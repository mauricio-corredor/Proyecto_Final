package com.miso.g2.ccpappmovil.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.ui.screens.products.ProductListItem
import com.miso.g2.ccpappmovil.ui.screens.products.ProductsAppBar
import com.miso.g2.ccpappmovil.ui.screens.products.ProductsTittleBar

@Composable
fun ProductsMainPage(navController: NavController) {
    Column {
        ProductsAppBar(navController)
        Spacer(modifier = Modifier.size(20.dp))
        ProductsTittleBar()
        LazyColumn(
            contentPadding = PaddingValues(4.dp),
            verticalArrangement = Arrangement.spacedBy(4.dp),

            ) {
            items(15) {
                ProductListItem()
            }
        }
    }
}