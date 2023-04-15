package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.miso.g2.ccpappmovil.repository.OrdersRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class OrdersViewModel @Inject constructor(private val ordersRepositoryImp: OrdersRepository) :
    ViewModel() {
    fun getOrders() {
        viewModelScope.launch(Dispatchers.IO) {
            val orders = ordersRepositoryImp.getOrders()
            Log.d("OrdersViewModel", orders.toString())
        }
    }
}