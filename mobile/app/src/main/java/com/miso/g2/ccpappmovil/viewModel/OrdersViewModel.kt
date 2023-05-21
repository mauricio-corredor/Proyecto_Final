package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.miso.g2.ccpappmovil.MyApplication.Companion.numberOfProductsInCart
import com.miso.g2.ccpappmovil.MyApplication.Companion.orderActiveNumber
import com.miso.g2.ccpappmovil.model.*
import com.miso.g2.ccpappmovil.repository.OrdersRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import javax.inject.Inject
import com.miso.g2.ccpappmovil.MyApplication.Companion.orderProductsList
import com.miso.g2.ccpappmovil.MyApplication.Companion.salesmanDefault
import com.miso.g2.ccpappmovil.MyApplication.Companion.userDefault

@HiltViewModel
class OrdersViewModel @Inject constructor(private val ordersRepositoryImp: OrdersRepository) :
    ViewModel() {

    private val gson: Gson = GsonBuilder().create()

    private val _showOrderCreatedToast = mutableStateOf(false)
    private val _orderNumberCreatedforToast = mutableStateOf("")
    private val _cartIsEmptyState = mutableStateOf(true)

    var showOrderCreatedToast: State<Boolean> = _showOrderCreatedToast
    var cartIsEmptyState: State<Boolean> = _cartIsEmptyState

    fun getOrders() {
        viewModelScope.launch(Dispatchers.IO) {
            val orders = ordersRepositoryImp.getOrders()
            Log.d("OrdersViewModel1", orders.toString())
        }
    }

    fun postOrder(vSubtotal: Float, vTaxes: Float, vTotal: Float) {
        val newOrderToPost = OrderDetail(
            numeroOrden =  orderActiveNumber.value.toString(),  //generateRandomId(8),
            clienteDetalle = ClienteDetalle(
                nombre = userDefault.nombre,
                direccion = userDefault.direccion,
                telefono = userDefault.telefono
            ),
            vendedorDetalle = VendedorDetalle(
                pais = salesmanDefault.localizacion.printableName,
                nombre = salesmanDefault.nombre
            ),
            resumenOrden = ResumenOrden(vSubtotal, vTaxes, vTotal),
            estadoOrden = EstadoOrden.EN_PROCESO,
            productosOrden = orderProductsList
        )

        val json = gson.toJson(newOrderToPost)
        val requestBody = json.toRequestBody("application/json".toMediaType())
        var errorMessage: String by mutableStateOf("")

        Log.d("productViewModel_post0", newOrderToPost.toString())
        Log.d("productViewModel_post1", json)
        Log.d("productViewModel_post2", requestBody.toString())

        viewModelScope.launch(Dispatchers.IO) {
            try {
                val responseToSendOrder = ordersRepositoryImp.sendOrder(newOrderToPost)
                Log.d("OrdersViewModel2", responseToSendOrder.toString())
                _showOrderCreatedToast.value = true
                _orderNumberCreatedforToast.value = newOrderToPost.numeroOrden
            } catch (e: java.lang.Exception) {
                errorMessage = e.message.toString()
            }
        }
        deleteCart()
    }

    fun deleteCart() {
        orderProductsList = mutableListOf()
        numberOfProductsInCart.value = 0
        orderActiveNumber.value=""
        //orderProductsList.clear()
    }

    fun deleteOneItemOfCart(productToDelete: ProductoOrden) {
        var sizeList = orderProductsList.size
        if (sizeList > 0) {
            orderProductsList.remove(productToDelete)
            numberOfProductsInCart.value = numberOfProductsInCart.value?.minus(1)
        }
    }


    fun generateRandomId(length: Int): String {
        val allowedChars = ('A'..'Z') + ('a'..'z') + ('0'..'9') // Lista de caracteres permitidos
        return (1..length)
            .map { allowedChars.random() }
            .joinToString("")
    }
}