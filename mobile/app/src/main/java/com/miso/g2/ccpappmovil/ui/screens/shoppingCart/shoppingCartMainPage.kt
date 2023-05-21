package com.miso.g2.ccpappmovil.ui.screens.shoppingCart

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.miso.g2.ccpappmovil.MyApplication.Companion.orderProductsList
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.model.ProductoOrden
import com.miso.g2.ccpappmovil.ui.screens.products.NavigationBar
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.Text
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import com.miso.g2.ccpappmovil.viewModel.OrdersViewModel

@Composable
fun ShoppingCartMainPage(navController: NavController, viewModel: OrdersViewModel = hiltViewModel()) {

    var subTotalOrder = 0.0F
    var taxOrder = 0.0F
    var totalOrder = 0.0F

    val contextForToast = LocalContext.current.applicationContext
    val textCartEmpty = R.string.cart_is_empty

    if (orderProductsList.size > 0) {
        for (element in orderProductsList) {
            subTotalOrder += element.valorTotal
            taxOrder = subTotalOrder * 0.19F
            totalOrder = subTotalOrder + taxOrder
        }
    }

    Box(
        modifier = Modifier
            .background(color = BackgroundMain)
            .fillMaxSize()
    ) {
        Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
            NavigationBar(navController = navController, tittleBar = stringResource(id = R.string.shoppingcart_page))
            Divider()
            Spacer(modifier = Modifier.size(20.dp))

            if (orderProductsList.size == 0) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center) {
                    Text(
                        text = stringResource(id = R.string.cart_is_empty),
                        style = MaterialTheme.typography.caption,
                        color = Color.White,
                    )
                }
            }

            for (product in orderProductsList) {
                CardItemCart(product)
            }
            Spacer(modifier = Modifier.size(20.dp))
            Divider()
            Spacer(modifier = Modifier.size(10.dp))
            CardFooterOrder(subTotalOrder, taxOrder, totalOrder)
            Spacer(modifier = Modifier.size(10.dp))
            Divider()
            OutlinedButton(
                onClick = {
                    if (orderProductsList.size > 0) {
                        viewModel.postOrder(subTotalOrder, taxOrder, totalOrder)
                    } else {
                        Toast.makeText(contextForToast, textCartEmpty, Toast.LENGTH_SHORT).show()
                    }
                },
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
                    backgroundColor = Color.Green,
                    contentColor = Color.Black
                )
            ) {
                Text(
                    text = stringResource(id = R.string.create_order_text),
                    modifier = Modifier.padding(6.dp)
                )
            }
        }
    }
}

@Preview
@Composable
fun PreviewShoppingCartMainPage() {
    val navController = rememberNavController()
    ShoppingCartMainPage(navController)
}

@Composable
fun CardItemCart(productInCart: ProductoOrden) {
    Card(
        modifier = Modifier
            .padding(horizontal = 4.dp, vertical = 4.dp)
            .fillMaxWidth()
            .height(60.dp),
        backgroundColor = BackgroundMain,
        elevation = 4.dp,
        shape = RoundedCornerShape(corner = CornerSize(5.dp))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.End
        ) {
            Column(modifier = Modifier.padding(end = 5.dp)) {
                Text(
                    text = productInCart.descripcionProducto,
                    style = MaterialTheme.typography.caption,
                    color = Color.White,
                    maxLines = 1
                )
                Row(modifier = Modifier.align(Alignment.End)) {
                    Text(
                        text = stringResource(R.string.cart_quantity, productInCart.cantidadVendida),
                        style = MaterialTheme.typography.caption,
                        color = Color.Green
                    )
                    Text(
                        text = stringResource(id = R.string.pesos) + productInCart.precioProducto,
                        style = MaterialTheme.typography.caption,
                        color = Color.Green,
                        textDecoration = TextDecoration.Underline
                    )
                }
            }
            Icon(
                imageVector = Icons.Filled.Delete,
                contentDescription = stringResource(id = R.string.delete_product_text),
                tint = Color.White
            )
        }
    }
}

@Composable
fun CardFooterOrder(subT: Float, taxes: Float, total: Float) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 16.dp, end = 16.dp, top = 5.dp, bottom = 5.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.End
    ) {
        Text(
            text = stringResource(id = R.string.shopping_cart_subtotal_label),
            style = MaterialTheme.typography.caption,
            color = Color.White,
            modifier = Modifier.weight(1f)
        )
        Text(
            text = stringResource(id = R.string.pesos) + subT,
            style = MaterialTheme.typography.caption,
            color = Color.White,
            maxLines = 1
        )
    }
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 16.dp, end = 16.dp, top = 5.dp, bottom = 5.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.End
    ) {
        Text(
            text = stringResource(id = R.string.shopping_cart_tax_label),
            style = MaterialTheme.typography.caption,
            color = Color.White,
            modifier = Modifier.weight(1f)
        )
        Text(
            text = stringResource(id = R.string.pesos) + taxes,
            style = MaterialTheme.typography.caption,
            color = Color.White,
            maxLines = 1
        )
    }
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 16.dp, end = 16.dp, top = 5.dp, bottom = 5.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.End
    ) {
        Text(
            text = stringResource(id = R.string.shopping_cart_total_label),
            style = MaterialTheme.typography.subtitle2,
            color = Color.Yellow,
            modifier = Modifier.weight(1f)
        )
        Text(
            text = stringResource(id = R.string.pesos) + total,
            style = MaterialTheme.typography.subtitle2,
            color = Color.Yellow,
            maxLines = 1
        )
    }
}