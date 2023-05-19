package com.miso.g2.ccpappmovil.ui.screens.shoppingCart

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyItemScope
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.miso.g2.ccpappmovil.model.CartItemArticleDetail
import com.miso.g2.ccpappmovil.ui.theme.BackgroundMain
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.material.Divider
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import coil.compose.AsyncImage
import com.miso.g2.ccpappmovil.R

@Composable
fun ShoppingCartList(carItemList: List<CartItemArticleDetail>) {
    LazyColumn(modifier = Modifier.padding(top = 20.dp, start = 10.dp, end = 10.dp)) {
        items(carItemList.size) { shoppingCartItem ->
            CartListItem(
                carItemList[shoppingCartItem]
                //cartItemArticleData = shoppingCartItem.cartItemArticleData,
                //removeArticleItemFromCart = shoppingCartItem::removeArticleItemFromShoppingCart
            )
        }
    }
}

@Composable
fun LazyItemScope.CartListItem(cartItemArticleData: CartItemArticleDetail) {
    ShoppingCartItemBackground {
        AsyncImage(
            model = cartItemArticleData.imagenProducto,
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .padding(4.dp)
                .size(80.dp)
                .clip(RoundedCornerShape(corner = CornerSize(5.dp)))
        )
        Row(
            modifier = Modifier
                .fillParentMaxWidth()
                .fillMaxHeight(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.End
        ) {
            Column(modifier = Modifier.padding(end = 5.dp)) {
                Text(
                    text = cartItemArticleData.descripcionProducto,
                    style = MaterialTheme.typography.caption,
                    color = Color.White,
                    maxLines = 1
                )
                //Text.Text11spRegularBlack(text = cartItemArticleData.articleName)
                Row(modifier = Modifier.align(Alignment.End)) {
                    Text(
                        text = stringResource(R.string.cart_quantity, cartItemArticleData.cantidadArticulos),
                        style = MaterialTheme.typography.caption,
                        color = Color.Yellow
                    )
                    Text(
                        text = stringResource(R.string.cart_price, cartItemArticleData.precioProducto),
                        style = MaterialTheme.typography.caption,
                        color = Color.Yellow,
                        textDecoration = TextDecoration.Underline
                    )
                }
            }
            Icon(
                imageVector = Icons.Filled.Delete,
                contentDescription = "Borrar articulo del carrito",
                tint = Color.White
            )

            //Image.CartRemoveIcon(onClickAction = removeArticleItemFromCart::invoke)
        }
    }
    Divider()
}

@Preview
@Composable
fun PreviewCartList() {
    val articlesOnCart: MutableList<CartItemArticleDetail> = mutableListOf()
    val articleOne = CartItemArticleDetail(
        "62544cad-3dfd-42b1-bc4d-18c09dfdaaf1",
        "Articulo de prueba 1",
        "https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SL1500_.jpg",
        "Computers",
        "MOCK1",
        150.9F,
        2
    )
    val articleTwo = CartItemArticleDetail(
        "62544cad-3dfd-42b1-bc4d-18c09dfdaaf2",
        "Articulo de prueba 2",
        "https://m.media-amazon.com/images/I/61pUul1oDlL._AC_SL1500_.jpg",
        "Accessories",
        "MOCK1",
        33.5F,
        1
    )
    articlesOnCart.add(articleOne)
    articlesOnCart.add(articleTwo)

    ShoppingCartList(carItemList = articlesOnCart)

}

@Composable
fun ShoppingCartItemBackground(content: @Composable BoxWithConstraintsScope.() -> Unit) {
    BoxWithConstraints(
        modifier = Modifier
            .height(80.dp)
            .padding(2.dp)
            .clip(shape = RoundedCornerShape(10.dp))
            .background(BackgroundMain)
    ) {
        content.invoke(this)
    }
}

//
//@Composable
//fun BoxWithConstraintsScope.CartArticleIcon(drawable: Int) {
//    Image(
//        painter = painterResource(id = drawable),
//        contentDescription = "",
//        Modifier
//            .height(maxHeight)
//            .width(10.dp)
//    )
//}

