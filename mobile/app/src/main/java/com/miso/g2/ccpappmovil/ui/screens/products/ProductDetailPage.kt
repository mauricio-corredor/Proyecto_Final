package com.miso.g2.ccpappmovil.ui.screens.products

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clipScrollableContainer
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.ui.theme.backgroundSecondary
import com.miso.g2.ccpappmovil.ui.theme.backgroundTwo
import com.miso.g2.ccpappmovil.viewModel.ProductViewModel

@Composable
fun ProductDetailPage(
    productIdToView: String, navController: NavController, viewModel: ProductViewModel = hiltViewModel()
) {
    LaunchedEffect(Unit, block = {
        viewModel.getProduct(productIdToView)
        Log.d("Realiza_consulta", productIdToView)
    })

    Column(modifier = Modifier.clipScrollableContainer(Orientation.Vertical)) {

        NavigationBar(navController = navController, tittleBar = stringResource(R.string.products_page))
        Divider()
        if (viewModel.errorMessage.isEmpty()) {
            val productoConsultado = viewModel.productConsulted
            Log.d("product_detail_page1", productoConsultado.size.toString())
            Log.d("product_detail_page2", productoConsultado.toString())

            Column {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(productoConsultado.size) { contentList ->
                        AsyncImage(
                            model = productoConsultado[contentList].imagenProducto,
                            contentDescription = null,
                            modifier = Modifier
                                .heightIn(max = 300.dp)
                                .fillMaxWidth()
                                .padding(0.dp)
                                .clip(RoundedCornerShape(corner = CornerSize(5.dp))),
                            contentScale = ContentScale.Crop
                        )
                        Column(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp, top = 16.dp)) {
                            Text(
                                text = productoConsultado[contentList].codigoProducto,
                                style = MaterialTheme.typography.h5,
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                            )
                        }
                        Column(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                            Divider(modifier = Modifier.padding(bottom = 4.dp))
                            Text(
                                text = "Descripcion",
                                modifier = Modifier.height(24.dp),
                                color = Color.Yellow,
                                style = MaterialTheme.typography.caption,
                            )
                            Text(
                                text = productoConsultado[contentList].descripcionProducto,
                                modifier = Modifier.height(24.dp),
                                style = MaterialTheme.typography.body1,
                                color = Color.White,
                                overflow = TextOverflow.Visible
                            )
                        }
                        Column(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                            Divider(modifier = Modifier.padding(bottom = 4.dp))
                            Text(
                                text = stringResource(R.string.precio),
                                modifier = Modifier.height(24.dp),
                                color = Color.Yellow,
                                style = MaterialTheme.typography.caption,
                            )
                            Text(
                                text = stringResource(id = R.string.pesos) + productoConsultado[contentList].precioProducto.toString(),
                                modifier = Modifier.height(24.dp),
                                style = MaterialTheme.typography.body1,
                                color = Color.White,
                                overflow = TextOverflow.Visible
                            )
                        }
                        Column(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                            Divider(modifier = Modifier.padding(bottom = 4.dp))
                            Text(
                                text = "Disponibilidad",
                                modifier = Modifier.height(24.dp),
                                color = Color.Yellow,
                                style = MaterialTheme.typography.caption,
                            )
                            Text(
                                text = productoConsultado[contentList].precioProducto.toString() + " Unidades",
                                modifier = Modifier.height(24.dp),
                                style = MaterialTheme.typography.body1,
                                color = Color.White,
                                overflow = TextOverflow.Visible
                            )
                        }
                        Divider(modifier = Modifier.padding(bottom = 4.dp))
                        AddCartFooter(productoConsultado[contentList].precioProducto.toInt())
                    }
                }
            }
        } else {
            Text(viewModel.errorMessage)
        }
    }
}

@Composable
fun AddCartFooter(numberMaxProduct: Int) {

    Text(
        text = "Selecciones la cantidad de unidades a agregar a la orden:",
        color = Color.LightGray,
        style = MaterialTheme.typography.caption,
        modifier = Modifier.padding(start = 16.dp)
    )
    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxWidth()) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            val amountToAdd: MutableState<Int> = rememberSaveable { mutableStateOf(0) }
            IconButton(onClick = {
                if (amountToAdd.value > 0) {
                    amountToAdd.value--
                } else amountToAdd.value = 0
            }) {
                Icon(
                    imageVector = Icons.Default.KeyboardArrowDown,
                    contentDescription = "Counter down",
                    tint = Color.White
                )
            }
            Box(
                contentAlignment = Alignment.Center, modifier = Modifier
                    .width(100.dp)
                    .height(30.dp)
                    .background(
                        backgroundTwo
                    )
            ) {
                Text(
                    text = "${amountToAdd.value}",
                    color = Color.White,
                    style = MaterialTheme.typography.subtitle1,
                    textAlign = TextAlign.Center
                )
            }
            IconButton(onClick = {
                if (amountToAdd.value < numberMaxProduct) {
                    amountToAdd.value++
                }
            })
            {
                Icon(
                    imageVector = Icons.Default.KeyboardArrowUp,
                    contentDescription = "counter up",
                    tint = Color.White
                )
            }
        }
    }
    OutlinedButton(
        onClick = { },  //Debe llamar a la funcion que adiciona al arelgo del carrito el producto
        shape = RoundedCornerShape(4.dp),
        //enabled = false,
        elevation = ButtonDefaults.elevation(
            defaultElevation = 10.dp,
            pressedElevation = 5.dp,
            disabledElevation = 0.dp,
        ), modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = ButtonDefaults.buttonColors(
            backgroundColor = backgroundSecondary,
            contentColor = Color.White
        )
    ) {
        Text(
            text = "Agregar al carrito",
            modifier = Modifier.padding(6.dp)
        )
    }
}

@Preview
@Composable
fun CounterAdd() {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        val count: MutableState<Int> = remember { mutableStateOf(0) }
        Text(text = "The current count is ${count.value} ")
        Button(onClick = { count.value++ }) {
            Text(text = "Add")
        }
    }
}

