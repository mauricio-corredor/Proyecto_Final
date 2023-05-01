package com.miso.g2.ccpappmovil.ui.screens.products

import androidx.compose.foundation.BorderStroke
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.material.Text
import androidx.compose.ui.tooling.preview.Preview
import coil.compose.AsyncImage
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.ui.theme.backgroundSecondary

@Preview
@Composable
fun ProductListItem() {
    val productoMock = ProductDetail(
        "2544cad-3dfd-42b1-bc4d-18c09dfdaafa",
        "Multisport GPS Running Watch With Heart Rate, Black/Gray",
        "https://m.media-amazon.com/images/I/711hICehp4L._AC_SX679_.jpg",
        "Amazon",
        "Garmin",
        "20",
        "Running GPS Units",
        "14-12-2030",
        "ccp001",
        246.99F
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .border(border = BorderStroke(1.dp, backgroundSecondary))
    ) {
        Row() {
            Text(
                text = "1",
                style = MaterialTheme.typography.subtitle2,
                color = Color.White,
                modifier = Modifier
                    .align(Alignment.CenterVertically)
                    .padding(3.dp)
            )
            Box(
                modifier = Modifier
                    .height(70.dp)
                    .width(73.dp)
                    .align(Alignment.CenterVertically)
            ) {
                AsyncImage(
                    model = productoMock.imagenProducto,
                    contentDescription = null
                )
            }
            Box(
                modifier = Modifier
                    .height(73.dp)
                    .width(260.dp)
            ) {
                Column() {
                    Text(
                        text = productoMock.descripcionProducto,
                        maxLines = 2,
                        style = MaterialTheme.typography.subtitle2,
                        color = Color.White
                    )
                    Text(
                        text = productoMock.tipoProducto,
                        style = MaterialTheme.typography.caption,
                        color = Color.LightGray
                    )
                    Text(
                        text = "$" + productoMock.precioProducto.toString(),
                        style = MaterialTheme.typography.overline,
                        color = Color.Yellow
                    )
                }
            }
            Text(
                text = "100",
                style = MaterialTheme.typography.subtitle2,
                color = Color.Yellow,
                modifier = Modifier.align(Alignment.CenterVertically)
            )
        }
    }
}