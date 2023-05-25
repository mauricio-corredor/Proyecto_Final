package com.miso.g2.ccpappmovil.ui.screens.homePage

import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import java.util.*

@Composable
fun lowHomeBar() {

    val currentLocale: Locale = Locale.getDefault()
    val language: String = currentLocale.language

    val englishText = "English"
    val spanishText = "Español"

    val activeTextStyle = MaterialTheme.typography.subtitle2
        .copy(color = Color.Yellow, textDecoration = TextDecoration.Underline)

    val inactiveTextStyle = MaterialTheme.typography.subtitle2

    val englishAnnotatedString = if (language == "en") {
        AnnotatedString.Builder(englishText)
            .apply {
                pushStyle(activeTextStyle.toSpanStyle())
            }
            .toAnnotatedString()
    } else {
        AnnotatedString(englishText)
    }

    val spanishAnnotatedString = if (language == "es") {
        AnnotatedString.Builder(spanishText)
            .apply {
                pushStyle(activeTextStyle.toSpanStyle())
            }
            .toAnnotatedString()
    } else {
        AnnotatedString(spanishText)
    }

    Row(
        horizontalArrangement = Arrangement.Center,
        modifier = Modifier
            .fillMaxWidth()
            .padding(20.dp)
    ) {
        Text(
            text = englishAnnotatedString,
            style = if (language == "en") activeTextStyle else inactiveTextStyle
        )
        Spacer(modifier = Modifier.size(20.dp))
        Text(
            text = "|",
            color = Color.White
        )
        Spacer(modifier = Modifier.size(20.dp))
        Text(
            text = spanishAnnotatedString,
            style = if (language == "es") activeTextStyle else inactiveTextStyle
        )
    }
}