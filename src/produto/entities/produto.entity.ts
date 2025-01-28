import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numerictransformer";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Estoque } from "../../estoque/entities/estoque.entity";

@Entity({ name: "tb_produtos" })
export class Produto {

  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim()) 
  @IsNotEmpty()
  @MaxLength(100)
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Column({type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer()})
  preco: number;

  @Column({ nullable: true })
  foto: string;

  @Transform(({ value }: TransformFnParams) => value?.trim()) 
  @IsNotEmpty()
  @MaxLength(100)
  @Column({ length: 100, nullable: false })
  marca: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
      onDelete: "CASCADE"})
      categoria: Categoria;

  @OneToMany(() => Estoque, (estoque) => estoque.produto)
      estoque: Estoque[];
    
}