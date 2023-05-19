package com.miso.g2.ccpappmovil.ui.screens.homePage

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain

@Composable
fun upHomeBar(navController:NavController) {
    val contextForToast = LocalContext.current.applicationContext
    Box(
        modifier = Modifier
            .height(40.dp)
            .fillMaxWidth()
            .background(color = BackgroundMain)
    ) {
        IconButton(onClick = {
            Toast.makeText(contextForToast, "Ir a configuración idioma", Toast.LENGTH_SHORT).show()
            navController.navigate("config_page")
        }) {
            Icon(
                imageVector = Icons.Filled.Settings,
                contentDescription = "Ir al configuración de idioma",
                tint = Color.White
            )
        }
    }
}