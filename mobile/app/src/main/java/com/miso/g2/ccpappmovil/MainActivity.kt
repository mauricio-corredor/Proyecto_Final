package com.miso.g2.ccpappmovil

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Alignment.Companion.CenterHorizontally
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.miso.g2.ccpappmovil.ui.navigation.ScreensRoute
import com.miso.g2.ccpappmovil.ui.navigation.navigation
import com.miso.g2.ccpappmovil.ui.screens.ProductsMainPage
import com.miso.g2.ccpappmovil.ui.screens.products.ProductsAppBar
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.CcpAppMovilTheme
import com.miso.g2.ccpappmovil.ui.theme.backgroundSecondary
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

//@Preview
//@Composable
//fun navigationPage() {
//    val navController = rememberNavController()
//    NavHost(navController = navController, startDestination = "homePage") {
//        composable("homePage") {
//            ScreensRoute.HomePage(navController)
//        }
//        composable("Greeting") {
//            Greeting(navController)
//        }
//        composable("ProductsMainPage") {
//            ProductsMainPage(navController)
//        }
//    }
//}


//@Composable
//fun homePage(navController: NavController) {
//    Box(
//        modifier = Modifier
//            .background(color = BackgroundMain)
//            .fillMaxSize()
//    ) {
//        Column {
//            upHomeBar()
//            logoHomeBox()
//
//            Row(
//                modifier = Modifier
//                    .padding(10.dp)
//                    .align(CenterHorizontally)
//            ) {
//                homeButton(nameButton = "Ver Productos", backgroundSecondary, navController, "ProductsMainPage")
//                Spacer(modifier = Modifier.size(20.dp))
//                homeButton(nameButton = "Crear orden", backgroundSecondary, navController, "Greeting")
//            }
//            Row(
//                modifier = Modifier
//                    .padding(10.dp)
//                    .align(CenterHorizontally)
//            ) {
//                homeButton(nameButton = "Ver Ordenes", backgroundSecondary, navController, "Greeting")
//                Spacer(modifier = Modifier.size(20.dp))
//                homeButton(nameButton = "Salir", Color.Red, navController, "Greeting")
//            }
//            Spacer(modifier = Modifier.size(20.dp))
//
//            lowHomeBar()
//        }
//    }
//}

//@Composable
//fun upHomeBar() {
//    val contextForToast = LocalContext.current.applicationContext
//    Box(
//        modifier = Modifier
//            .height(40.dp)
//            .fillMaxWidth()
//            .background(color = BackgroundMain)
//    ) {
//        IconButton(onClick = {
//            Toast.makeText(contextForToast, "Ir a configuración idioma", Toast.LENGTH_SHORT).show()
//        }) {
//            Icon(
//                imageVector = Icons.Filled.Settings,
//                contentDescription = "Ir al configuración de idioma",
//                tint = Color.White
//            )
//        }
//    }
//}

//@Composable
//fun logoHomeBox() {
//    Box(
//        contentAlignment = Alignment.Center,
//        modifier = Modifier
//            .height(200.dp)
//            .fillMaxWidth()
//            .background(color = BackgroundMain)
//    ) {
//        Image(painter = painterResource(id = R.drawable.logo_ccp_fondo_blanco), contentDescription = "Logo de CCP")
//    }
//    Box(
//        contentAlignment = Alignment.Center,
//        modifier = Modifier
//            .height(30.dp)
//            .fillMaxWidth()
//            .background(color = BackgroundMain)
//    ) {
//        val userNameLogged = "Pedro Pérez"
//        Text(text = "Bienvenido $userNameLogged", style = MaterialTheme.typography.subtitle2, color = Color.White)
//    }
//    Spacer(modifier = Modifier.size(30.dp))
//}

//@Composable
//fun homeButton(nameButton: String, colorButton: Color, navController: NavController, destination: String) {
//    Column() {
//        Box(
//            contentAlignment = Alignment.Center,
//            modifier = Modifier
//                .height(125.dp)
//                .width(125.dp)
//                .background(color = colorButton)
//                .clickable { navController.navigate(destination) }  // Aqui hay que pasar la funcion del NavHost
//        ) {
//            Icon(
//                imageVector = Icons.Filled.Settings,
//                contentDescription = nameButton,
//                tint = Color.White
//            )
//        }
//        Box(
//            contentAlignment = Alignment.Center,
//            modifier = Modifier
//                .height(25.dp)
//                .width(125.dp)
//                .background(color = colorButton)
//        )
//        {
//            Text(
//                text = nameButton,
//                style = MaterialTheme.typography.caption,
//                color = Color.White
//            )
//        }
//    }
//}

//@Composable
//fun lowHomeBar() {
//    Row(
//        horizontalArrangement = Arrangement.Center, modifier = Modifier
//            .fillMaxWidth()
//            .padding(20.dp)
//    ) {
//        Text(text = "English", style = MaterialTheme.typography.subtitle2, color = Color.Yellow)
//        Spacer(modifier = Modifier.size(20.dp))
//        Text(text = "|", color = Color.White)
//        Spacer(modifier = Modifier.size(20.dp))
//        Text(text = "Español", style = MaterialTheme.typography.subtitle2, color = Color.Yellow)
//    }
//}


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