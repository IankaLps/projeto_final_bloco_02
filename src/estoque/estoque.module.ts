import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estoque } from "./entities/estoque.entity";
import { EstoqueController } from "./controllers/estoque.controller";
import { EstoqueService } from "./services/estoque.service";

@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
  exports: [EstoqueService],
})
export class EstoqueModule {}
