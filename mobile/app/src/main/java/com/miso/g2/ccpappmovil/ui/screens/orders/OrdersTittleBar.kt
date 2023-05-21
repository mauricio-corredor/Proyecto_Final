package com.miso.g2.ccpappmovil.ui.screens.orders

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
fun OrdersTittleBar() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 24.dp, top = 4.dp, end = 30.dp, bottom = 4.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = stringResource(id = R.string.hash_text),
                style = MaterialTheme.typography.subtitle2,
                color = Color.White,
                modifier = Modifier
                    .weight(0.05f)
                    .padding(4.dp)
            )
            Text(
                text = stringResource(id = R.string.order_id_text),
                style = MaterialTheme.typography.subtitle2,
                color = Color.White,
                modifier = Modifier
                    .weight(0.25f)
                    .padding(4.dp)
            )
            Text(
                text = stringResource(id = R.string.order_customer_text),
                style = MaterialTheme.typography.subtitle2,
                color = Color.White,
                modifier = Modifier
                    .weight(0.45f)
                    .padding(4.dp)
            )
            Text(
                text = stringResource(id = R.string.order_estatus_text),
                style = MaterialTheme.typography.subtitle2,
                color = Color.White,
                modifier = Modifier
                    .weight(0.25f)
                    .padding(4.dp)
            )
        }
    }
}