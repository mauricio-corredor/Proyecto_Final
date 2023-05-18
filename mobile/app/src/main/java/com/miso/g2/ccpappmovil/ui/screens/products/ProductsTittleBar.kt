package com.miso.g2.ccpappmovil.ui.screens.products

import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.miso.g2.ccpappmovil.R

@Preview
@Composable
fun ProductsTittleBar() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(4.dp)
    ) {
        Row() {
            Box(
                modifier = Modifier
                    .width(20.dp)
                    .align(Alignment.CenterVertically)
            ) {
                Text(
                    text = " ",
                    style = MaterialTheme.typography.subtitle2,
                    color = Color.White,
                    modifier = Modifier
                        .padding(4.dp)
                )
            }
            Box(
                modifier = Modifier
                    .width(73.dp)
                    .align(Alignment.CenterVertically),
                Alignment.Center
            ) {
                Text(
                    text = stringResource(id = R.string.image_product_text),
                    style = MaterialTheme.typography.subtitle2,
                    color = Color.White,
                )
            }
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.CenterVertically),
                Alignment.Center
            ) {
                Text(
                    buildAnnotatedString {
                        withStyle(
                            style = SpanStyle(
                                color = Color.Yellow,
                            )
                        ) {
                            append(stringResource(id = R.string.code_product_text))
                        }
                        withStyle(
                            style = SpanStyle(
                                color = Color.White,
                            )
                        ) {
                            append(
                                " | " +
                                        stringResource(
                                            id = R.string.description_product_text
                                        ) + " | " +
                                        stringResource(
                                            id = R.string.price_product_text
                                        ) + " | " +
                                        stringResource(
                                            id = R.string.availability_product_text
                                        )
                            )
                            //append(" | Descripcion | Precio | Disponibilidad")
                        }
                    },
                    style = MaterialTheme.typography.subtitle2
                )
            }
        }
    }
}