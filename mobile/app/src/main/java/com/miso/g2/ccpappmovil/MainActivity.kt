package com.miso.g2.ccpappmovil

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.ui.navigation.navigation
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.CcpAppMovilTheme
import com.miso.g2.ccpappmovil.viewModel.OrdersViewModel
import com.miso.g2.ccpappmovil.viewModel.ProductViewModel
import com.miso.g2.ccpappmovil.viewModel.ProductsViewModel
import dagger.hilt.android.AndroidEntryPoint

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


@Composable
fun Greeting(navController: NavController, viewModel: ProductViewModel = hiltViewModel()) {
    Column {
        Button(
            onClick = { viewModel.getProduct() }, elevation = ButtonDefaults.elevation(
                defaultElevation = 10.dp,
                pressedElevation = 15.dp,
                disabledElevation = 0.dp
            ), modifier = Modifier.padding(10.dp)
        ) {
            Text(text = "Consultar Producto")
        }
        ProductosConsulta()
        OrdenesConsulta()
    }
}

@Composable
fun ProductosConsulta(viewModel: ProductsViewModel = hiltViewModel()) {
    Button(
        onClick = { viewModel.getProducts() }, elevation = ButtonDefaults.elevation(
            defaultElevation = 10.dp,
            pressedElevation = 15.dp,
            disabledElevation = 0.dp
        ), modifier = Modifier.padding(10.dp)
    ) {
        Text(text = "Consultar Productos")
    }
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