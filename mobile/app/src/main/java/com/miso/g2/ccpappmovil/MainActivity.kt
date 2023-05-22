package com.miso.g2.ccpappmovil

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.miso.g2.ccpappmovil.ui.navigation.navigation
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.CcpAppMovilTheme
import dagger.hilt.android.AndroidEntryPoint
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import kotlinx.coroutines.delay
import kotlin.system.exitProcess

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            //val navController = rememberNavController()
            CcpAppMovilTheme {
                Surface( // A surface container using the 'background' color from the theme
                    color = BackgroundMain
                ) {
                    navigation()
                }
            }
        }
    }
}


@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Preview
@Composable
fun ExitPage() {
    Box(
        modifier = Modifier
            .background(color = BackgroundMain)
            .fillMaxSize()
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .height(200.dp)
                    .fillMaxWidth()
                    .background(color = BackgroundMain)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.logo_ccp_fondo_blanco),
                    contentDescription = "Logo de CCP", modifier = Modifier.align(Alignment.Center)
                )

            }
        }
        Text(
            text = "Hasta pronto...",
            style = MaterialTheme.typography.subtitle1,
            color = Color.White,
            modifier = Modifier.align(Alignment.Center)
        )
    }
    LaunchedEffect(Unit) {
        delay(5000)
    }
    exitProcess(0)
}

