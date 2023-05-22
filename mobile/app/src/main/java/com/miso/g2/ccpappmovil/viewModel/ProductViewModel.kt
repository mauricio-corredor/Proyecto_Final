package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.repository.ProductRepository
import com.miso.g2.ccpappmovil.repository.ProductsRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductViewModel @Inject constructor(private val productRepositoryImp: ProductRepository) : ViewModel() {
    private val _productConsulted = mutableStateListOf<ProductDetail>()
    var errorMessage: String by mutableStateOf("")
    val productConsulted: List<ProductDetail>
        get() = _productConsulted

    fun getProduct(productId: String) {
        viewModelScope.launch(Dispatchers.IO) {
            Log.d("Product_ViewModel0", productId)

            try {
                _productConsulted.clear()
                _productConsulted.addAll(listOf(productRepositoryImp.getProduct(productId)))
                Log.d("Product_ViewModel1", _productConsulted.toString())
                Log.d("Product_ViewModel2", productConsulted.toString())
            } catch (e: java.lang.Exception) {
                errorMessage = e.message.toString()
            }
        }
    }
}