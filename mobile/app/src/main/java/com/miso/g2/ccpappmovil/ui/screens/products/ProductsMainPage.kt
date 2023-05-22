package com.miso.g2.ccpappmovil.ui.screens

import android.annotation.SuppressLint
import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.ui.screens.products.*
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.viewModel.ProductsViewModel
import java.util.Locale

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun ProductsMainPage(navController: NavController, viewModel: ProductsViewModel = hiltViewModel()) {
    LaunchedEffect(Unit, block = {
        viewModel.getProducts()
    })
    val textState = remember { mutableStateOf(TextFieldValue("")) }
    Column {
        //ProductsAppBar(navController)
        NavigationBar(navController = navController, tittleBar = stringResource(R.string.products_page))
        Divider()
        //Spacer(modifier = Modifier.size(10.dp))
        SearchProductBar(textState)
        Divider()
        //Spacer(modifier = Modifier.size(10.dp))
        ProductsTittleBar()
        Divider()
        MakeProductsList(navController, viewModel, textState)
    }
}

@Composable
fun MakeProductsList(navController: NavController, viewModel: ProductsViewModel, state: MutableState<TextFieldValue>) {
    if (viewModel.errorMessage.isEmpty()) {
        val allProducts = viewModel.productsList
        Log.d("make_products_list0", allProducts.toString())
        var filteredProducts: List<ProductDetail>
        Column(modifier = Modifier.padding(16.dp)) {
            LazyColumn(modifier = Modifier.fillMaxHeight()) {
                val searchedText = state.value.text
                filteredProducts = if (searchedText.isEmpty()) {
                    allProducts
                } else {
                    val resultList = ArrayList<ProductDetail>()
                    for (product in allProducts.indices) {
                        if (allProducts[product].codigoProducto.lowercase(Locale.getDefault())
                                .contains(searchedText.lowercase(Locale.getDefault()))
                        ) {
                            resultList.add(allProducts[product])
                        }
                    }
                    resultList
                }
                items(filteredProducts.size) { contentList ->
                    CardRow(navController, filteredProducts[contentList])
                }
            }
        }
    } else {
        Text(viewModel.errorMessage)
    }
}


@Composable
fun CardRow(navController: NavController, productForList: ProductDetail) {
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
            modifier = Modifier.clickable(onClick = {
                val productSelected = productForList.idProducto
                //Toast.makeText(contextForToast, productSelected, Toast.LENGTH_SHORT).show()
                navController.navigate("product_view_detail_page/$productSelected")

            })
        )
        {
            AsyncImage(
                model = productForList.imagenProducto,
                contentDescription = null,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .padding(4.dp)
                    .size(80.dp)
                    .clip(RoundedCornerShape(corner = CornerSize(5.dp)))
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(4.dp)
                    .align(Alignment.CenterVertically)
            )
            {
                Text(
                    text = productForList.codigoProducto.toString(),
                    style = MaterialTheme.typography.caption,
                    color = Color.Yellow,
                    maxLines = 1
                )
                Text(
                    text = productForList.descripcionProducto,
                    style = MaterialTheme.typography.button,
                    color = Color.White,
                    maxLines = 2
                )
                Text(
                    text = productForList.tipoProducto,
                    style = MaterialTheme.typography.caption,
                    color = Color.White,
                    maxLines = 1
                )
                Text(
                    text = stringResource(R.string.price_product_text) + ": " + stringResource(id = R.string.pesos) + productForList.precioProducto.toString(),
                    style = MaterialTheme.typography.caption,
                    color = Color.White,
                    maxLines = 1
                )
                Text(
                    text = stringResource(id = R.string.cantidad) + " " + productForList.precioProducto.toString() + stringResource(
                        id = R.string.units
                    ),
                    style = MaterialTheme.typography.caption,
                    color = Color.White,
                    maxLines = 1
                )
            }
        }
    }
}
