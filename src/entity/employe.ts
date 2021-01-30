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
export class Employe extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Field()
	nom: string;

	@Column()
	@Field()
	adresse: string;

	@Field(() => [Travail])
	@OneToMany(() => Travail, (travail) => travail.employe, {
		cascade: true,
		eager: true
	})
	public travails: Travail[];

	constructor(nom: string, adresse: string) {
		super();
		this.nom = nom;
		this.adresse = adresse;
	}
}
