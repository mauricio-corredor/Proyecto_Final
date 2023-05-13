package com.miso.g2.ccpappmovil.ui.screens.products

import android.util.Log
import androidx.compose.foundation.clipScrollableContainer
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Divider
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.miso.g2.ccpappmovil.R
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.ui.screens.CardRow
import com.miso.g2.ccpappmovil.viewModel.ProductViewModel

@Composable
fun ProductDetailPage(productIdToView: String, navController: NavController, viewModel: ProductViewModel = hiltViewModel()
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

            //Column(modifier = Modifier.padding(16.dp)) {
            Column() {
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


                    }

                }


            }
        } else {
            Text(viewModel.errorMessage)
        }
    }
}