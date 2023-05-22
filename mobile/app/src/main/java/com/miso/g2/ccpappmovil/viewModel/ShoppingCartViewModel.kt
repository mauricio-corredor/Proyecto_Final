package com.miso.g2.ccpappmovil.viewModel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateListOf
import androidx.lifecycle.ViewModel
import com.miso.g2.ccpappmovil.model.CartItemArticleDetail

class ShoppingCartViewModel : ViewModel() {
    val shoppingCartItems = mutableStateListOf<CartItemArticleDetail>()

    val shoppingCartTotalPriceState: State<Float> = TODO()


}