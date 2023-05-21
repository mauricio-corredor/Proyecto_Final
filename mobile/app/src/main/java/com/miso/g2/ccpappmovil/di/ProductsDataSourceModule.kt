package com.miso.g2.ccpappmovil.di

import com.miso.g2.ccpappmovil.networkServiceAdapter.ProductsRestDataSource
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
class ProductsDataSourceModule {

    @Singleton
    @Provides
    @Named("ProductsBaseUrl")
    fun providerBaseUrl() = "http://lb-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81"

    @Singleton
    @Provides
    @Named("ProductsRetrofit")
    fun provideRetrofit(@Named("ProductsBaseUrl") baseUrl: String): Retrofit {
        return Retrofit.Builder()
            .client(getUnsafeOkHttpClient())
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl(baseUrl)
            .build()
    }

    @Singleton
    @Provides
    fun restDataSource(@Named("ProductsRetrofit") retrofit: Retrofit): ProductsRestDataSource =
        retrofit.create(ProductsRestDataSource::class.java)

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

