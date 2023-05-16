package com.miso.g2.ccpappmovil.ui.screens.configPage

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.Settings
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.miso.g2.ccpappmovil.MyApplication.Companion.salesmanDefault
import com.miso.g2.ccpappmovil.model.CitiesCcp
import com.miso.g2.ccpappmovil.model.CountriesCcp
import com.miso.g2.ccpappmovil.model.IdiomsCcp
import com.miso.g2.ccpappmovil.ui.navigation.ScreensRoute
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.backgroundSecondary
import com.miso.g2.ccpappmovil.ui.theme.backgroundTwo

@Composable
fun ConfigPage(navController: NavController) {
    Box(
        modifier = Modifier
            .background(color = BackgroundMain)
            .fillMaxSize()
    ) {
        Column(modifier = Modifier.verticalScroll(rememberScrollState())) {

            Spacer(modifier = Modifier.size(50.dp))

            Row(
                modifier = Modifier
                    .padding(10.dp)
                    .align(Alignment.CenterHorizontally)
            ) {
                Text(
                    text = "Ajustes de presentación",
                    style = MaterialTheme.typography.h5,
                    color = Color.White
                )
            }

            Row(
                modifier = Modifier
                    .padding(10.dp)
                    .align(Alignment.CenterHorizontally)
            ) {
                Icon(
                    imageVector = Icons.Filled.Settings,
                    contentDescription = "Pagina de configuracion",
                    tint = Color.White
                )
            }

            Divider(modifier = Modifier.padding(bottom = 4.dp))
            Spacer(modifier = Modifier.size(30.dp))

            Row(
                modifier = Modifier
                    .padding(10.dp)
                    .align(Alignment.CenterHorizontally)
            ) {
                Text(
                    text = "Usuario: " + salesmanDefault.nombre,
                    style = MaterialTheme.typography.body1,
                    color = Color.White,
                    textAlign = TextAlign.Center
                )
            }

            Spacer(modifier = Modifier.size(30.dp))
            Divider(modifier = Modifier.padding(bottom = 4.dp))

            IdiomUi()
            CountryUi()
            CityUi()

            Divider(modifier = Modifier.padding(bottom = 4.dp))

            OutlinedButton(
                onClick = { navController.navigate(ScreensRoute.HomePage.route) },
                shape = RoundedCornerShape(4.dp),
                elevation = ButtonDefaults.elevation(
                    defaultElevation = 10.dp,
                    pressedElevation = 5.dp,
                    disabledElevation = 0.dp,
                ), modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                colors = ButtonDefaults.buttonColors(
                    backgroundColor = backgroundSecondary,
                    contentColor = Color.White
                )
            ) {
                Text(
                    text = "Volver a Home",
                    modifier = Modifier.padding(6.dp)
                )
            }
        }
    }
}


@Preview
@Composable
fun PreviewConfigPage() {
    val navController = rememberNavController()
    ConfigPage(navController)
}

@Composable
fun IdiomMenu(
    expanded: Boolean, onItemClick: (String) -> Unit, onDismiss: () -> Unit
) {
    val idiomOptions = listOf(IdiomsCcp.ESPAÑOL.toString(), IdiomsCcp.INGLES.toString())

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = onDismiss
    ) {
        idiomOptions.forEach { option ->
            DropdownMenuItem(
                onClick = {
                    onItemClick(option)
                    onDismiss()
                }
            ) {
                Text(text = option)
            }
        }
    }
}

@Composable
fun IdiomUi() {
    var idiomMenuOpen by remember { mutableStateOf(false) }
    var idiomSelected by remember { mutableStateOf(salesmanDefault.idiomaInteface.toString()) }

    Box(
        Modifier
            .border(width = 1.dp, shape = RectangleShape, color = Color.Transparent)
            .padding(horizontal = 0.dp)
            .fillMaxWidth()
            .height(56.dp)

    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .align(Alignment.Center)
        ) {
            Text(
                text = "Idioma predefinido: ",
                style = MaterialTheme.typography.body2,
                color = Color.White
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .fillMaxHeight(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.End
            ) {
                Text(
                    text = idiomSelected,
                    style = MaterialTheme.typography.body2,
                    color = Color.Yellow,
                    modifier = Modifier.padding(end = 6.dp)
                )
                IconButton(
                    onClick = { idiomMenuOpen = true },
                    modifier = Modifier
                        .size(24.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.MoreVert,
                        contentDescription = "Idiomas de interface",
                        tint = Color.White,
                    )
                    IdiomMenu(
                        expanded = idiomMenuOpen,
                        onItemClick = {
                            idiomSelected = it
                            val idiomToUserUi = IdiomsCcp.values().find { it.name == idiomSelected }
                            if (idiomToUserUi != null) {
                                salesmanDefault.idiomaInteface = idiomToUserUi
                            }
                        },
                        onDismiss = {
                            idiomMenuOpen = false
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun CountryMenu(
    expanded: Boolean, onItemClick: (String) -> Unit, onDismiss: () -> Unit
) {
    val countryOptions =
        listOf(
            CountriesCcp.ECUADOR.toString(),
            CountriesCcp.COLOMBIA.toString(),
            CountriesCcp.CHILE.toString(),
            CountriesCcp.MEXICO.toString(),
            CountriesCcp.PERU.toString()
        )

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = onDismiss
    ) {
        countryOptions.forEach { option ->
            DropdownMenuItem(
                onClick = {
                    onItemClick(option)
                    onDismiss()
                }
            ) {
                Text(text = option)
            }
        }
    }
}

@Composable
fun CountryUi() {
    var countryMenuOpen by remember { mutableStateOf(false) }
    var countrySelected by remember { mutableStateOf(salesmanDefault.localizacion.toString()) }

    Box(
        Modifier
            .border(width = 1.dp, shape = RectangleShape, color = Color.Transparent)
            .padding(horizontal = 0.dp)
            .fillMaxWidth()
            .height(56.dp)

    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .align(Alignment.Center)
        ) {
            Text(
                text = "Localización (pais): ",
                style = MaterialTheme.typography.body2,
                color = Color.White
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .fillMaxHeight(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.End
            ) {
                Text(
                    text = countrySelected,
                    style = MaterialTheme.typography.body2,
                    color = Color.Yellow,
                    modifier = Modifier.padding(end = 6.dp)
                )
                IconButton(
                    onClick = { countryMenuOpen = true },
                    modifier = Modifier
                        .size(24.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.MoreVert,
                        contentDescription = "Paises de operación CCP",
                        tint = Color.White,
                    )
                    CountryMenu(
                        expanded = countryMenuOpen,
                        onItemClick = {
                            countrySelected = it
                            val countryUser = CountriesCcp.values().find { it.name == countrySelected }
                            if (countryUser != null) {
                                salesmanDefault.localizacion = countryUser
                                when (countryUser) {
                                    CountriesCcp.ECUADOR -> {salesmanDefault.ciudad = CitiesCcp.QUITO}
                                    CountriesCcp.CHILE -> salesmanDefault.ciudad = CitiesCcp.SANTIAGO
                                    CountriesCcp.COLOMBIA -> salesmanDefault.ciudad = CitiesCcp.BOGOTA
                                    CountriesCcp.MEXICO -> salesmanDefault.ciudad = CitiesCcp.CIUDAD_DE_MEXICO
                                    CountriesCcp.PERU -> salesmanDefault.ciudad = CitiesCcp.LIMA
                                }
                            }
                        },
                        onDismiss = {
                            countryMenuOpen = false
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun CityMenu(
    expanded: Boolean, onItemClick: (String) -> Unit, onDismiss: () -> Unit
) {
    var cityOptions: List<String>

    when (salesmanDefault.localizacion) {
        CountriesCcp.ECUADOR -> cityOptions = listOf(
            CitiesCcp.CUENCA.toString(),
            CitiesCcp.ESMERALDAS.toString(),
            CitiesCcp.GUAYAQUIL.toString(),
            CitiesCcp.LOJA.toString(),
            CitiesCcp.QUITO.toString()
        )
        CountriesCcp.COLOMBIA -> cityOptions = listOf(
            CitiesCcp.BARRANQUILLA.toString(),
            CitiesCcp.BOGOTA.toString(),
            CitiesCcp.CALI.toString(),
            CitiesCcp.MEDELLIN.toString(),
            CitiesCcp.NEIVA.toString()
        )
        CountriesCcp.CHILE -> cityOptions = listOf(
            CitiesCcp.CONCEPCION.toString(),
            CitiesCcp.COQUIMBO.toString(),
            CitiesCcp.IQUIQUE.toString(),
            CitiesCcp.SANTIAGO.toString(),
            CitiesCcp.VALPARAISO.toString()
        )
        CountriesCcp.MEXICO -> cityOptions = listOf(
            CitiesCcp.CANCUN.toString(),
            CitiesCcp.CIUDAD_DE_MEXICO.toString(),
            CitiesCcp.GUADALAJARA.toString(),
            CitiesCcp.MONTERREY.toString(),
            CitiesCcp.TANGAMANDAPIO.toString()
        )
        CountriesCcp.PERU -> cityOptions = listOf(
            CitiesCcp.AREQUIPA.toString(),
            CitiesCcp.CHICLAYO.toString(),
            CitiesCcp.CUZCO.toString(),
            CitiesCcp.LIMA.toString(),
            CitiesCcp.PIURA.toString()
        )
    }

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = onDismiss
    ) {
        cityOptions.forEach { option ->
            DropdownMenuItem(
                onClick = {
                    onItemClick(option)
                    onDismiss()
                }
            ) {
                Text(text = option)
            }
        }
    }
}

@Composable
fun CityUi() {
    var cityMenuOpen by remember { mutableStateOf(false) }
    var citySelected by remember { mutableStateOf(salesmanDefault.ciudad.toString()) }

    Box(
        Modifier
            .border(width = 1.dp, shape = RectangleShape, color = Color.Transparent)
            .padding(horizontal = 0.dp)
            .fillMaxWidth()
            .height(56.dp)

    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .align(Alignment.Center)
        ) {
            Text(
                text = "Localización (pais): ",
                style = MaterialTheme.typography.body2,
                color = Color.White
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .fillMaxHeight(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.End
            ) {
                Text(
                    text = citySelected,
                    style = MaterialTheme.typography.body2,
                    color = Color.Yellow,
                    modifier = Modifier.padding(end = 6.dp)
                )
                IconButton(
                    onClick = { cityMenuOpen = true },
                    modifier = Modifier
                        .size(24.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.MoreVert,
                        contentDescription = "Paises de operación CCP",
                        tint = Color.White,
                    )
                    CityMenu(
                        expanded = cityMenuOpen,
                        onItemClick = {
                            citySelected = it
                            val cityUser = CitiesCcp.values().find { it.name == citySelected }
                            if (cityUser != null) {
                                salesmanDefault.ciudad = cityUser
                            }
                        },
                        onDismiss = {
                            cityMenuOpen = false
                        }
                    )
                }
            }
        }
    }
}

//            Column() {
//                Row(modifier = Modifier.padding(16.dp)) {
//                    Text(
//                        text = "Idioma predefinido: ",
//                        style = MaterialTheme.typography.body2,
//                        color = Color.White
//                    )
//                    Row(
//                        modifier = Modifier
//                            .fillMaxWidth()
//                            .fillMaxHeight(),
//                        verticalAlignment = Alignment.CenterVertically,
//                        horizontalArrangement = Arrangement.End
//                    ) {
//                        Text(
//                            text = salesmanDefault.idiomaInteface.toString(),
//                            style = MaterialTheme.typography.body2,
//                            color = Color.Yellow,
//                        )
//                    }
//                }
//                Row(modifier = Modifier.padding(16.dp)) {
//                    Text(
//                        text = "Localización: ",
//                        style = MaterialTheme.typography.body2,
//                        color = Color.White
//                    )
//                    Row(
//                        modifier = Modifier
//                            .fillMaxWidth()
//                            .fillMaxHeight(),
//                        verticalAlignment = Alignment.CenterVertically,
//                        horizontalArrangement = Arrangement.End
//                    ) {
//                        Text(
//                            text = salesmanDefault.localizacion.printableName,
//                            style = MaterialTheme.typography.body2,
//                            color = Color.Yellow,
//                        )
//                    }
//                }
//                Row(modifier = Modifier.padding(16.dp)) {
//                    Text(
//                        text = "Ciudad: ",
//                        style = MaterialTheme.typography.body2,
//                        color = Color.White
//                    )
//                    Row(
//                        modifier = Modifier
//                            .fillMaxWidth()
//                            .fillMaxHeight(),
//                        verticalAlignment = Alignment.CenterVertically,
//                        horizontalArrangement = Arrangement.End
//                    ) {
//                        Text(
//                            text = salesmanDefault.ciudad.toString(),
//                            style = MaterialTheme.typography.body2,
//                            color = Color.Yellow,
//                        )
//                    }
//                }
//            }