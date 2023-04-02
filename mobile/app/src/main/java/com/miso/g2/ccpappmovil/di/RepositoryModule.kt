package com.miso.g2.ccpappmovil.di

import com.miso.g2.ccpappmovil.repository.ProductRepository
import com.miso.g2.ccpappmovil.repository.ProductRepositoryImp
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    @Singleton
    abstract fun productRepository(repo: ProductRepositoryImp): ProductRepository
}