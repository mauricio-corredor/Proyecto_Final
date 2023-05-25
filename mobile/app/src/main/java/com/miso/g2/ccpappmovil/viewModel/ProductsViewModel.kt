package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.miso.g2.ccpappmovil.MyApplication.Companion.salesmanDefault
import com.miso.g2.ccpappmovil.model.*
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

    fun getInventory(countryName: String) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                _productsList.clear()
                _productsList.addAll(productsRepositoryImp.getInventory(countryName))
                Log.d("ProductsViewModel3", _productsList.toString())
                Log.d("ProductsViewModel4", productsList.toString())
            } catch (e: java.lang.Exception) {
                errorMessage = e.message.toString()
            }

        }
    }
}

