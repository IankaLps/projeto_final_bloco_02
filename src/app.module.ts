import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { EstoqueModule } from './estoque/estoque.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia_ecommerce',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      extra: {decimalNumbers: true,},
    }),
    CategoriaModule,
    ProdutoModule,
    EstoqueModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
