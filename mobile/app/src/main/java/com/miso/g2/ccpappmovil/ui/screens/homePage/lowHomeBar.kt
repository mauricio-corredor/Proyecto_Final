package com.miso.g2.ccpappmovil.ui.screens.homePage

import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun lowHomeBar() {
    Row(
        horizontalArrangement = Arrangement.Center, modifier = Modifier
            .fillMaxWidth()
            .padding(20.dp)
    ) {
        Text(text = "English", style = MaterialTheme.typography.subtitle2, color = Color.Yellow)
        Spacer(modifier = Modifier.size(20.dp))
        Text(text = "|", color = Color.White)
        Spacer(modifier = Modifier.size(20.dp))
        Text(text = "Español", style = MaterialTheme.typography.subtitle2, color = Color.Yellow)
    }
}