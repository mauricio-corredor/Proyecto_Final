package com.miso.g2.ccpappmovil.ui.screens

import android.annotation.SuppressLint
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.ui.screens.products.ProductsAppBar
import com.miso.g2.ccpappmovil.ui.screens.products.ProductsTittleBar
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.viewModel.ProductsViewModel

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun ProductsMainPage(navController: NavController, viewModel: ProductsViewModel = hiltViewModel()) {
    LaunchedEffect(Unit, block = {
        viewModel.getProducts()
    })
    Column {
        ProductsAppBar(navController)
        Spacer(modifier = Modifier.size(10.dp))
        SearchBar()
        Spacer(modifier = Modifier.size(10.dp))
        ProductsTittleBar()
        Divider()
        MakeProductsList(viewModel)
    }
}

@Composable
fun MakeProductsList(viewModel: ProductsViewModel) {
    if (viewModel.errorMessage.isEmpty()) {
        val itemsList = viewModel.productsList.size
        Column(modifier = Modifier.padding(16.dp)) {
            LazyColumn(modifier = Modifier.fillMaxHeight()) {
                items(itemsList) { contentList ->
                    CardRow(productForList = viewModel.productsList[contentList])
                }
            }
        }
    } else {
        Text(viewModel.errorMessage)
    }
}


@Composable
fun CardRow(productForList: ProductDetail) {
    Card(
        modifier = Modifier
            .padding(horizontal = 4.dp, vertical = 4.dp)
            .fillMaxWidth(),
        backgroundColor = BackgroundMain,
        elevation = 4.dp,
        shape = RoundedCornerShape(corner = CornerSize(5.dp))
    ) {
        Row(Modifier.clickable { }) {
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
                    text = stringResource(R.string.precio) + stringResource(id = R.string.pesos) + productForList.precioProducto.toString(),
                    style = MaterialTheme.typography.caption,
                    color = Color.White,
                    maxLines = 1
                )
                Text(
                    text = stringResource(id = R.string.cantidad) + productForList.precioProducto.toString() + " unds.",
                    style = MaterialTheme.typography.caption,
                    color = Color.White,
                    maxLines = 1
                )
            }
        }
    }
}
@Preview
@Composable
fun SearchBar() {
    var name by remember {
        mutableStateOf("")
    }
    Box(modifier = Modifier.fillMaxWidth().padding(start = 40.dp, end = 40.dp)) {
        TextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Código Producto") },
            trailingIcon = {
                if (name.isBlank())
                    Icon(
                        imageVector = Icons.Filled.Search,
                        contentDescription = "Limpiar campo de nombre"
                    )
            })
    }


//    TextField(
//        value = "",
//        onValueChange = {},
//        leadingIcon = {
//            Icon(
//                imageVector = Icons.Default.Search,
//                contentDescription = null
//            )
//        },
//        colors = TextFieldDefaults.textFieldColors(
//            backgroundColor = Color.LightGray
//        ),
//        placeholder = {
//            Text(stringResource(R.string.placeholder_search))
//        },
//     )
}