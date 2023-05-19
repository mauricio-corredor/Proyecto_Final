package com.miso.g2.ccpappmovil.ui.screens.products

import android.util.Log
import android.widget.Toast
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.miso.g2.ccpappmovil.MyApplication.Companion.orderProductsList
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.model.ProductoOrden
import com.miso.g2.ccpappmovil.ui.navigation.ScreensRoute
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
            val productDetailConsulted = viewModel.productConsulted
            Log.d("product_detail_page1", productDetailConsulted.size.toString())
            Log.d("product_detail_page2", productDetailConsulted.toString())

            Column {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(productDetailConsulted.size) { contentList ->
                        AsyncImage(
                            model = productDetailConsulted[contentList].imagenProducto,
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
                                text = productDetailConsulted[contentList].codigoProducto,
                                style = MaterialTheme.typography.h5,
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                            )
                        }
                        Column(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                            Divider(modifier = Modifier.padding(bottom = 4.dp))
                            Text(
                                text = stringResource(id = R.string.description_product_text) + ":",
                                modifier = Modifier.height(24.dp),
                                color = Color.Yellow,
                                style = MaterialTheme.typography.caption,
                            )
                            Text(
                                text = productDetailConsulted[contentList].descripcionProducto,
                                modifier = Modifier.height(24.dp),
                                style = MaterialTheme.typography.body1,
                                color = Color.White,
                                overflow = TextOverflow.Visible
                            )
                        }
                        Column(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                            Divider(modifier = Modifier.padding(bottom = 4.dp))
                            Text(
                                text = stringResource(R.string.price_product_text) + ":",
                                modifier = Modifier.height(24.dp),
                                color = Color.Yellow,
                                style = MaterialTheme.typography.caption,
                            )
                            Text(
                                text = stringResource(id = R.string.pesos) + productDetailConsulted[contentList].precioProducto.toString(),
                                modifier = Modifier.height(24.dp),
                                style = MaterialTheme.typography.body1,
                                color = Color.White,
                                overflow = TextOverflow.Visible
                            )
                        }
                        Column(modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                            Divider(modifier = Modifier.padding(bottom = 4.dp))
                            Text(
                                text = stringResource(id = R.string.availability_product_text) + ":",
                                modifier = Modifier.height(24.dp),
                                color = Color.Yellow,
                                style = MaterialTheme.typography.caption,
                            )
                            Text(
                                text = productDetailConsulted[contentList].precioProducto.toString() + stringResource(id = R.string.units),
                                modifier = Modifier.height(24.dp),
                                style = MaterialTheme.typography.body1,
                                color = Color.White,
                                overflow = TextOverflow.Visible
                            )
                        }
                        Divider(modifier = Modifier.padding(bottom = 4.dp))
                        AddCartFooter(productDetailConsulted[contentList],navController)
                    }
                }
            }
        } else {
            Text(viewModel.errorMessage)
        }
    }
}

@Composable
fun AddCartFooter(productData: ProductDetail,navController: NavController) {

    val numberMaxProduct = productData.precioProducto.toInt()
    val amountToAdd: MutableState<Int> = rememberSaveable { mutableStateOf(0) }
    val contextForToast = LocalContext.current.applicationContext
    var textError = stringResource(id = R.string.no_amount_selected_text)
    var textConfirmAmount = stringResource(id = R.string.amount_added_text)

    Text(
        text = stringResource(id = R.string.add_products_text),
        color = Color.LightGray,
        style = MaterialTheme.typography.caption,
        modifier = Modifier.padding(start = 16.dp)
    )
    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxWidth()) {
        Row(verticalAlignment = Alignment.CenterVertically) {
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
        //Agrega el producto a la lista de productos de la orden de compra actual
        onClick = {
            if (amountToAdd.value > 0) {
                if (orderProductsList.isNotEmpty()) {
                    var idProductValidate = orderProductsList.any { it.idProducto == productData.idProducto }
                    if (idProductValidate) {
                        val modifierAmountProduct = orderProductsList.find { it.idProducto == productData.idProducto }
                        if (modifierAmountProduct != null) {
                            modifierAmountProduct.cantidadVendida = amountToAdd.value
                            Toast.makeText(
                                contextForToast,
                                textConfirmAmount + modifierAmountProduct.cantidadVendida,
                                Toast.LENGTH_SHORT
                            ).show()
                            Log.d("prueba_prod_a_carrito1", orderProductsList.toString())
                        }
                    }
                } else {
                    var newProductToCart = ProductoOrden(
                        productData.idProducto,
                        productData.codigoProducto,
                        productData.descripcionProducto,
                        amountToAdd.value,
                        productData.precioProducto,
                        amountToAdd.value * productData.precioProducto
                    )
                    orderProductsList.add(newProductToCart)
                    Toast.makeText(
                        contextForToast,
                        textConfirmAmount + newProductToCart.cantidadVendida,
                        Toast.LENGTH_SHORT
                    ).show()
                    Log.d("prueba_prod_a_carrito2", orderProductsList.toString())
                }
            } else
                Toast.makeText(contextForToast, textError, Toast.LENGTH_SHORT).show()
        },


        shape = RoundedCornerShape(4.dp),
        enabled = true,
        elevation = ButtonDefaults.elevation(
            defaultElevation = 10.dp,
            pressedElevation = 5.dp,
            disabledElevation = 0.dp,
        ), modifier = Modifier
            .fillMaxWidth()
            .padding(start = 16.dp, top = 20.dp, end = 16.dp, bottom = 5.dp),
        colors = ButtonDefaults.buttonColors(
            backgroundColor = backgroundSecondary,
            contentColor = Color.White
        )
    ) {
        Text(
            text = stringResource(id = R.string.add_to_cart_button_text),
            modifier = Modifier.padding(6.dp)
        )
    }

    OutlinedButton(
        onClick = { navController.navigate(ScreensRoute.ProductsMainPage.route)},
      shape = RoundedCornerShape(4.dp),
        enabled = true,
        elevation = ButtonDefaults.elevation(
            defaultElevation = 10.dp,
            pressedElevation = 5.dp,
            disabledElevation = 0.dp,
        ), modifier = Modifier
            .fillMaxWidth()
            .padding(start = 16.dp, top = 5.dp, end = 16.dp, bottom = 5.dp),
        colors = ButtonDefaults.buttonColors(
            backgroundColor = backgroundTwo,
            contentColor = Color.White
        )
    ) {
        Text(
            text = stringResource(id = R.string.back_to_product_list_text),
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

