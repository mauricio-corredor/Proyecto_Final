package com.miso.g2.ccpappmovil.di

import com.miso.g2.ccpappmovil.networkServiceAdapter.OrdersRestDataSource
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Named
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
class OrdersDataSourceModule {

    @Singleton
    @Provides
    @Named("OrdersBaseUrl")
    fun ordersProviderBaseUrl() = "http://lb-app-bodega-2115956073.us-east-1.elb.amazonaws.com:84"

    @Singleton
    @Provides
    @Named("OrdersRetrofit")
    fun ordersProvideRetrofit(@Named("OrdersBaseUrl") baseUrl: String): Retrofit {
        return Retrofit.Builder()
            .client(getUnsafeOkHttpClient())
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl(baseUrl)
            .build()
    }

    @Singleton
    @Provides
    fun ordersRestDataSource(@Named("OrdersRetrofit") retrofit: Retrofit): OrdersRestDataSource =
        retrofit.create(OrdersRestDataSource::class.java)

    @Provides
    @Singleton
    fun getUnsafeOkHttpClient(): OkHttpClient {
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.HEADERS
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        val builder = OkHttpClient.Builder()
        builder.addInterceptor(interceptor) // <-- this is the important line!
        return builder.build()
    }
}

