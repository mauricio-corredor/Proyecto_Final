package com.miso.g2.ccpappmovil

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.ui.navigation.navigation
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.CcpAppMovilTheme
import com.miso.g2.ccpappmovil.viewModel.OrdersViewModel
import com.miso.g2.ccpappmovil.viewModel.ProductsViewModel
import dagger.hilt.android.AndroidEntryPoint
import androidx.compose.foundation.lazy.LazyColumn
import com.miso.g2.ccpappmovil.ui.screens.CardRow

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            //val navController = rememberNavController()
            CcpAppMovilTheme {
                Surface( // A surface container using the 'background' color from the theme
                    color = BackgroundMain
                ) {
                    //Greeting()
                    //navigationPage()
                    navigation()
                }
            }
        }
    }
}


@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun Greeting(navController: NavController, viewModel: ProductsViewModel = hiltViewModel()) {
    LaunchedEffect(Unit, block = {
        viewModel.getProducts()
    })
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row {
                        Text("Todos")
                    }
                })
        }, content = {
            if (viewModel.errorMessage.isEmpty()) {
                val itemsList = viewModel.productsList.size
                Column(modifier = Modifier.padding(16.dp)) {
                    LazyColumn(modifier = Modifier.fillMaxHeight()) {
                        items(itemsList) { contentList ->
                            //CardRow(productForList = viewModel.productsList[contentList])
                        }
                    }
                }
            } else {
                Text(viewModel.errorMessage)
            }
        }
    )
}

@Composable
fun OrdenesConsulta(viewModel: OrdersViewModel = hiltViewModel()) {
    Button(
        onClick = { viewModel.getOrders() }, elevation = ButtonDefaults.elevation(
            defaultElevation = 10.dp,
            pressedElevation = 15.dp,
            disabledElevation = 0.dp
        ), modifier = Modifier.padding(10.dp)
    ) {
        Text(text = "Consultar Ordenes")
    }
}