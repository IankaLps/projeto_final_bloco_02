import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, MoreThan, LessThan, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) {}

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true,
            }
        });
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: { 
                id 
            },
            relations: { 
                categoria: true,
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { 
                nome: ILike(`%${nome}%`) 
            },
            relations: { 
            categoria: true,
            }
        });
    }

    async findByPrecoMaior(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { preco: MoreThan(preco) },
            relations: { categoria: true },
            order: { preco: 'ASC' } // Ordenação crescente
        });
    }
    
    async findByPrecoMenor(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { preco: LessThan(preco) },
            relations: { categoria: true },
            order: { preco: 'DESC' } // Ordenação decrescente
        });
    }

    async create(produto: Produto): Promise<Produto> {
        const categoria = await this.categoriaService.findById(produto.categoria.id);
        produto.categoria = categoria;
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        await this.findById(produto.id);
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.produtoRepository.delete(id);
    }
}
