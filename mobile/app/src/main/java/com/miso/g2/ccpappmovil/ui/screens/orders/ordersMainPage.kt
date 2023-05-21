package com.miso.g2.ccpappmovil.ui.screens.orders

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.Divider
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.model.EstadoOrden
import com.miso.g2.ccpappmovil.model.OrderDetail
import com.miso.g2.ccpappmovil.ui.screens.products.NavigationBar
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.backgroundSecondary
import com.miso.g2.ccpappmovil.ui.theme.backgroundTwo
import com.miso.g2.ccpappmovil.viewModel.OrdersViewModel
import java.util.*
import kotlin.collections.ArrayList

@Composable
fun OrdersMainPage(
    navController: NavController, viewModel: OrdersViewModel = hiltViewModel()
) {
    LaunchedEffect(Unit, block = {
        viewModel.getOrders()
    })
    val textState = remember { mutableStateOf(TextFieldValue("")) }

    Box(
        modifier = Modifier
            .background(color = BackgroundMain)
            .fillMaxSize()
    ) {
        Column {
            NavigationBar(navController = navController, tittleBar = stringResource(R.string.orders_page))
            Divider()
            SearchOrdersBar(textState)
            Divider()
            OrdersTittleBar()
            Divider()
            MakeOrdersList(navController, viewModel, textState)
        }
    }
}

@Composable
fun MakeOrdersList(navController: NavController, viewModel: OrdersViewModel, state: MutableState<TextFieldValue>) {
    if (viewModel.errorMessage.isEmpty()) {
        val allOrders = viewModel.ordersList
        Log.d("make_orders_list0", allOrders.toString())
        var filteredOrders: List<OrderDetail>
        Column(modifier = Modifier.padding(16.dp)) {
            LazyColumn(modifier = Modifier.fillMaxHeight()) {
                val searchedText = state.value.text
                filteredOrders = if (searchedText.isEmpty()) {
                    allOrders
                } else {
                    val resultList = ArrayList<OrderDetail>()
                    for (order in allOrders.indices) {
                        if (allOrders[order].numeroOrden.lowercase(Locale.getDefault())
                                .contains(searchedText.lowercase(Locale.getDefault()))
                        ) {
                            resultList.add(allOrders[order])
                        }
                    }
                    resultList
                }
                items(filteredOrders.size) { contentList ->
                    CardRow(navController, filteredOrders[contentList], contentList + 1)
                }
            }
        }
    } else {
        Text(viewModel.errorMessage)
    }
}

@Composable
fun CardRow(navController: NavController, orderForList: OrderDetail, positionItem: Int) {
    val contextForToast = LocalContext.current.applicationContext
    val context = remember { mutableStateOf(TextFieldValue("")) }
    Card(
        modifier = Modifier
            .padding(horizontal = 4.dp, vertical = 4.dp)
            .fillMaxWidth(),
        backgroundColor = BackgroundMain,
        elevation = 4.dp,
        shape = RoundedCornerShape(corner = CornerSize(5.dp))
    ) {
        Row(
            modifier = Modifier
                .padding(10.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = positionItem.toString(),
                style = MaterialTheme.typography.caption,
                color = backgroundSecondary,
                modifier = Modifier.weight(0.05f)
            )
            Text(
                text = orderForList.numeroOrden,
                style = MaterialTheme.typography.caption,
                color = Color.White,
                modifier = Modifier.weight(0.25f)
            )
            Text(
                text = orderForList.clienteDetalle.nombre,
                style = MaterialTheme.typography.caption,
                color = Color.White,
                modifier = Modifier.weight(0.45f)
            )
            Text(
                text = orderForList.estadoOrden.printableName,
                style = MaterialTheme.typography.caption,
                color = Color.Black,
                modifier = Modifier
                    .weight(0.25f)
                    .background(getEstadoColor(orderForList.estadoOrden), shape = RoundedCornerShape(3.dp))
                    .padding(start = 10.dp, top = 4.dp, end = 4.dp, bottom = 4.dp)
            )
        }
    }
}

@Composable
fun getEstadoColor(estado: EstadoOrden): Color {
    return when (estado) {
        EstadoOrden.CANCELADA -> Color.Red
        EstadoOrden.EN_PROCESO -> Color.Magenta
        EstadoOrden.PROCESADA -> Color.Green
    }
}
