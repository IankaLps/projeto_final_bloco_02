import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({ name: "tb_estoque" })
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @IsDateString()
  @Column({ type: 'date', nullable: true })
  validade: string;  // O tipo da validade será 'string', já que o formato será uma string de data
  
  @ManyToOne(() => Produto, (produto) => produto.id, {
    onDelete: "CASCADE",
  })
  produto: Produto;
}