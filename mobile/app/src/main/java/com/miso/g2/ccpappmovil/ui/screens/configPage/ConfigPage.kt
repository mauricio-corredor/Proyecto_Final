package com.miso.g2.ccpappmovil.ui.screens.configPage

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.miso.g2.ccpappmovil.MyApplication.Companion.salesmanDefault
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun ConfigPage(navController: NavController) {
    Box(
        modifier = Modifier
            .background(color = BackgroundMain)
            .fillMaxSize()
    ) {
        Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
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
            Row(
                modifier = Modifier
                    .padding(10.dp)
                    .align(Alignment.CenterHorizontally)
            ) {
                Text(
                    text = "Ajustes de presentación",
                    style = MaterialTheme.typography.body1,
                    color = Color.White
                )
            }
            Spacer(modifier = Modifier.size(50.dp))
            Divider(modifier = Modifier.padding(bottom = 4.dp))
            Column() {
                Row(modifier = Modifier.padding(16.dp)) {
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
                            text = salesmanDefault.idiomaInteface.toString(),
                            style = MaterialTheme.typography.body2,
                            color = Color.Yellow,
                        )
                    }


//                    val options = listOf(IdiomsCcp.ESPANOL, IdiomsCcp.INGLES)
//                    var expanded by remember { mutableStateOf(false) }
//                    var selectedOptionText by remember { mutableStateOf(options[0]) }
//                    ExposedDropdownMenuBox(
//                        expanded = expanded,
//                        onExpandedChange = {
//                            expanded = !expanded
//                        }
//                    ) {
//                        TextField(
//                            readOnly = true,
//                            value = selectedOptionText,
//                            onValueChange = { },
//                            modifier = Modifier.menuAnchor(),
//                            label = { "Label" },
//                            trailingIcon = {
//                                ExposedDropdownMenuDefaults.TrailingIcon(
//                                    expanded = expanded,
//                                )
//                            },
//                            colors = ExposedDropdownMenuDefaults.textFieldColors(),
//                        )
//                        ExposedDropdownMenu(
//                            expanded = expanded,
//                            onDismissRequest = {
//                                expanded = false
//                            }
//                        ) {
//                            options.forEach { selectionOption ->
//                                DropdownMenuItem(
//                                    onClick = {
//                                        selectedOptionText = selectionOption
//                                        expanded = false
//                                    }
//                                ) {
//                                    Text(selectionOption.toString())
//                                }
//                            }
//                        }
                }
                Row(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Localización: ",
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
                            text = salesmanDefault.localizacion.printableName,
                            style = MaterialTheme.typography.body2,
                            color = Color.Yellow,
                        )
                    }
                }
                Row(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Ciudad: ",
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
                            text = salesmanDefault.ciudad.toString(),
                            style = MaterialTheme.typography.body2,
                            color = Color.Yellow,
                        )
                    }
                }
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
