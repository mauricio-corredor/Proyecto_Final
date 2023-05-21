package com.miso.g2.ccpappmovil.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.miso.g2.ccpappmovil.MyApplication.Companion.orderProductsList
import com.miso.g2.ccpappmovil.MyApplication.Companion.salesmanDefault
import com.miso.g2.ccpappmovil.MyApplication.Companion.userDefault
import com.miso.g2.ccpappmovil.model.*
import com.miso.g2.ccpappmovil.repository.ProductsRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import javax.inject.Inject

@HiltViewModel
class ProductsViewModel @Inject constructor(private val productsRepositoryImp: ProductsRepository) : ViewModel() {
    private val _productsList = mutableStateListOf<ProductDetail>()
    var errorMessage: String by mutableStateOf("")
    val productsList: List<ProductDetail>
        get() = _productsList

    private val gson: Gson = GsonBuilder().create()

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

    fun postOrder(vSubtotal: Float, vTaxes: Float, vTotal: Float) {

        val newOrderToPost = OrderDetail(
            numeroOrden = generateRandomId(8),
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

        Log.d("productViewModel_post0", newOrderToPost.toString())
        Log.d("productViewModel_post1", json)
        Log.d("productViewModel_post2", requestBody.toString())

    }

    fun generateRandomId(length: Int): String {
        val allowedChars = ('A'..'Z') + ('a'..'z') + ('0'..'9') // Lista de caracteres permitidos
        return (1..length)
            .map { allowedChars.random() }
            .joinToString("")
    }
}

