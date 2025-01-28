import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Estoque } from "../entities/estoque.entity";

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private estoqueRepository: Repository<Estoque>
  ) {}

  async findAll(): Promise<Estoque[]> {
    return await this.estoqueRepository.find(
        {
            relations: { 
            produto: true 
    },
    });
  }

  async findById(id: number): Promise<Estoque> {

    const estoque = await this.estoqueRepository.findOne(
        {
            where: { 
                id 
            },
                    relations: { 
                    produto: true 
                    },
    });

    if (!estoque) {
      throw new HttpException("Estoque não encontrado", HttpStatus.NOT_FOUND);
    }
    return estoque;
  }

  async create(estoque: Estoque): Promise<Estoque> {
    return await this.estoqueRepository.save(estoque);
  }

  async update(estoque: Estoque): Promise<Estoque> {

    await this.findById(estoque.id);

    return await this.estoqueRepository.save(estoque);
  }

  async delete(id: number): Promise<void> {

    await this.findById(id);

    await this.estoqueRepository.delete(id);
  }
}
