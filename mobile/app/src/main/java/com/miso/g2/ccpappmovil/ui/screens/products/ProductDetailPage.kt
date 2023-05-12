package com.miso.g2.ccpappmovil.ui.screens.products

import android.util.Log
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.viewModel.ProductViewModel

@Composable
fun ProductDetailPage(productId: String, navController: NavController, viewModel: ProductViewModel = hiltViewModel()) {
    LaunchedEffect(Unit, block = {
        viewModel.getProduct(productId)
    })
    var productToView = viewModel.getProduct(productId)
    Log.d("Probe Product ViewModel",productId.toString())
    
    Column() {
        Text(text = productId)
        Text(text = productToView.toString())
    }


}