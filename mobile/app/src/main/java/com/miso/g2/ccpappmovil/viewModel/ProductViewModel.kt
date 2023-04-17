package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.miso.g2.ccpappmovil.repository.ProductRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductViewModel @Inject constructor(
    private val productRepositoryImp: ProductRepository
) : ViewModel() {

    fun getProduct() {
        viewModelScope.launch(Dispatchers.IO) {
            val product = productRepositoryImp.getProduct()
            Log.d("ProductViewModel", product.toString())
        }
    }
}