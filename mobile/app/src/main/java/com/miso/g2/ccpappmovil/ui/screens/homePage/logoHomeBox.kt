package com.miso.g2.ccpappmovil.ui.screens.homePage

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.R

@Composable
fun logoHomeBox() {
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .height(200.dp)
            .fillMaxWidth()
            .background(color = BackgroundMain)
    ) {
        Image(painter = painterResource(id = R.drawable.logo_ccp_fondo_blanco), contentDescription = "Logo de CCP")
    }
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .height(30.dp)
            .fillMaxWidth()
            .background(color = BackgroundMain)
    ) {
        val userNameLogged = "Pedro Pérez"
        Text(text = "Bienvenido $userNameLogged", style = MaterialTheme.typography.subtitle2, color = Color.White)
    }
    Spacer(modifier = Modifier.size(30.dp))
}