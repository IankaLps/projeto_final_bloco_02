import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { EstoqueService } from "../services/estoque.service";
import { Estoque } from "../entities/estoque.entity";

    @Controller('/estoque')
    export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Estoque[]> {
    return this.estoqueService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Estoque> {
    return this.estoqueService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() estoque: Estoque): Promise<Estoque> {
    return this.estoqueService.create(estoque);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() estoque: Estoque): Promise<Estoque> {
    return this.estoqueService.update(estoque);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): void {
    this.estoqueService.delete(id);
    }
}