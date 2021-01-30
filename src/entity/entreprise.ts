import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Travail } from './travail';

@ObjectType()
@Entity()
export class Entreprise extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: 'varchar', unique: true })
	public design!: string;

	@Field()
	@Column({ type: 'varchar' })
	public adresse!: string;

	@Field(() => [Travail])
	@OneToMany(() => Travail, (travail) => travail.entreprise, {
		cascade: true,
		eager: true
	})
	public travails: Travail[];

	constructor(design: string, adresse: string) {
		super();
		this.design = design;
		this.adresse = adresse;
	}
}
