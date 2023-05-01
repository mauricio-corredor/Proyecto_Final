package com.miso.g2.ccpappmovil.ui.screens.products

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.*
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.navigation.NavController
import com.miso.g2.ccpappmovil.model.ProductDetail
import com.miso.g2.ccpappmovil.ui.navigation.ScreensRoute
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import com.miso.g2.ccpappmovil.ui.theme.backgroundSecondary

@Composable
//fun AddProductToOrderForm(productToAdd: ProductDetail, quaState: MutableState<TextFieldValue>) {
fun AddProductToOrderForm(
    navController: NavController,
    productCode: String,
    productDesc: String,
    productAvai: String, quaState: MutableState<TextFieldValue>
) {
    val quaFieldError = remember { mutableStateOf("") }
    val quaTextField = remember { mutableStateOf(quaState) }
    Dialog(onDismissRequest = { }) {
        Surface(
            shape = RoundedCornerShape(6.dp),
            color = Color.White
        ) {
            Box(contentAlignment = Alignment.Center) {
                Column() {
                    Box(
                        modifier = Modifier
                            .width(200.dp)
                            .align(Alignment.CenterHorizontally),
                        Alignment.Center
                    ) {
                        Text(
                            text = "Agregar producto a orden",
                            style = TextStyle(
                                fontSize = 16.sp,
                                fontFamily = FontFamily.Default,
                                fontWeight = FontWeight.Bold,
                                textAlign = TextAlign.Center
                            )
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Row() {
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically)
                        ) {
                            Text(
                                text = "Cod. producto: ",
                                style = MaterialTheme.typography.subtitle2,
                                color = Color.Black,
                                modifier = Modifier
                                    .padding(4.dp)
                            )
                        }
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically),
                            Alignment.Center
                        ) {
                            Text(
                                //text = productToAdd.codigoProducto.uppercase(),
                                text = productCode.uppercase(),
                                style = MaterialTheme.typography.caption,
                                color = Color.Black,
                            )
                        }
                    }

                    Row() {
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically)
                        ) {
                            Text(
                                text = "Descripción: ",
                                style = MaterialTheme.typography.subtitle2,
                                color = Color.Black,
                                modifier = Modifier
                                    .padding(4.dp)
                            )
                        }
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically),
                            Alignment.Center
                        ) {
                            Text(
                                //text = productToAdd.descripcionProducto,
                                text = productDesc,
                                style = MaterialTheme.typography.caption,
                                color = Color.Black,
                            )
                        }
                    }

                    Row() {
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically)
                        ) {
                            Text(
                                text = "Unidades disponibles: ",
                                style = MaterialTheme.typography.subtitle2,
                                color = Color.Black,
                                modifier = Modifier
                                    .padding(4.dp)
                            )
                        }
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically),
                            Alignment.Center
                        ) {
                            Text(
                                //text = productToAdd.precioProducto.toString(),
                                text = productAvai,
                                style = MaterialTheme.typography.caption,
                                color = Color.Black,
                            )
                        }
                    }

                    Row() {
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically)
                        ) {
                            Text(
                                text = "Unidades a solicitar: ",
                                style = MaterialTheme.typography.subtitle2,
                                color = Color.Black,
                                modifier = Modifier
                                    .padding(4.dp)
                            )
                        }
                        //Campo para agregar cantidad para orden
                        Box(
                            modifier = Modifier
                                .width(120.dp)
                                .align(Alignment.CenterVertically),
                            Alignment.Center
                        ) {
                            TextField(
                                value = quaState.value,
                                onValueChange = { value ->
                                    quaState.value = value
                                },
                                modifier = Modifier
                                    .fillMaxWidth(),
                                textStyle = TextStyle(color = Color.White, fontSize = 14.sp),
//                                leadingIcon = {
//                                    Icon(
//                                        Icons.Default.Search,
//                                        contentDescription = "",
//                                        modifier = Modifier
//                                            .padding(15.dp)
//                                            .size(24.dp)
//                                    )
//                                },
                                trailingIcon = {
                                    if (quaState.value != TextFieldValue("")) {
                                        IconButton(
                                            onClick = {
                                                quaState.value =
                                                    TextFieldValue("") // Remove text from TextField when you press the 'X' icon
                                            }
                                        ) {
                                            Icon(
                                                Icons.Default.Close,
                                                contentDescription = "",
                                                modifier = Modifier
                                                    .padding(15.dp)
                                                    .size(16.dp)
                                            )
                                        }
                                    }
                                },
                                singleLine = true,
                                shape = RectangleShape, // The TextFiled has rounded corners top left and right by default
                                colors = TextFieldDefaults.textFieldColors(
                                    textColor = Color.White,
                                    cursorColor = Color.White,
                                    leadingIconColor = Color.White,
                                    trailingIconColor = Color.White,
                                    backgroundColor = colorResource(id = com.miso.g2.ccpappmovil.R.color.backgroundMain),
                                    focusedIndicatorColor = Color.Transparent,
                                    unfocusedIndicatorColor = Color.Transparent,
                                    disabledIndicatorColor = Color.Transparent
                                )
                            )
                        }


                    }
                    //Buttons to navigate
                    Row(
                        horizontalArrangement = Arrangement.Center,
                        modifier = Modifier.padding(10.dp)
                    ) {
                        Button(
                            onClick = { /*TODO*/ },
                            colors = ButtonDefaults.buttonColors(backgroundColor = Color.Green),
                            elevation = ButtonDefaults.elevation(
                                defaultElevation = 10.dp,
                                pressedElevation = 15.dp,
                                disabledElevation = 0.dp
                            )
                        )
                        {
                            Text(text = "Agregar", color = Color.Black)
                        }

                        Spacer(modifier = Modifier.size(5.dp))

                        Button(
                            onClick = { navController.navigate(ScreensRoute.ProductsMainPage.route) },
                            colors = ButtonDefaults.buttonColors(backgroundColor = Color.Red),
                            elevation = ButtonDefaults.elevation(
                                defaultElevation = 10.dp,
                                pressedElevation = 15.dp,
                                disabledElevation = 0.dp
                            )
                        ) {
                            Text(text = "Cancelar", color = Color.White)
                        }


                    }
                }
            }
        }
    }
}

//@Preview
//@Composable
//fun previewAddProductToOrderForm() {
//    val quaTextState = remember { mutableStateOf(TextFieldValue("")) }
//    val productoMock = ProductDetail(
//        "2544cad-3dfd-42b1-bc4d-18c09dfdaafa",
//        "Multisport GPS Running Watch With Heart Rate, Black/Gray",
//        "https://m.media-amazon.com/images/I/711hICehp4L._AC_SX679_.jpg",
//        "Amazon",
//        "Garmin",
//        "20",
//        "Running GPS Units",
//        "14-12-2030",
//        "ccp001",
//        246.99F
//    )
//    AddProductToOrderForm(productoMock, quaTextState)
//}