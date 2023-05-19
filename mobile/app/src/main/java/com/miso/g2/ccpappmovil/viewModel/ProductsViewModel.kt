package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.repository.ProductsRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductsViewModel @Inject constructor(private val productsRepositoryImp: ProductsRepository) : ViewModel() {
    private val _productsList = mutableStateListOf<ProductDetail>()
    var errorMessage: String by mutableStateOf("")
    val productsList: List<ProductDetail>
        get() = _productsList

    fun getProducts() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                _productsList.clear()
                _productsList.addAll(productsRepositoryImp.getProducts())
                Log.d("ProductsViewModel1", _productsList.toString())
                Log.d("ProductsViewModel2", productsList.toString())
            } catch (e: java.lang.Exception) {
                errorMessage = e.message.toString()
            }

        }
    }
}