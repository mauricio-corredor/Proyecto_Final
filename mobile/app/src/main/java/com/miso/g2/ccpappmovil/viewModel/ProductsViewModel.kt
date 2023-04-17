package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.miso.g2.ccpappmovil.repository.ProductsRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductsViewModel @Inject constructor(private val productsRepositoryImp: ProductsRepository) :
    ViewModel() {
    fun getProducts() {
        viewModelScope.launch(Dispatchers.IO) {
            val products = productsRepositoryImp.getProducts()
            Log.d("ProductsViewModel", products.toString())
        }
    }
}
