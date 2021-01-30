import { Field, ObjectType } from 'type-graphql';

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Employe } from './employe';
import { Entreprise } from './entreprise';

@ObjectType()
@Entity()
export class Travail extends BaseEntity {
	@Field(() => Employe, { nullable: true })
	@ManyToOne(() => Employe, (employe) => employe.travails, {
		primary: true,
	})
	@JoinColumn({ name: 'num_employe', referencedColumnName: 'id' })
	public employe: Employe;

	@Field(() => Entreprise, { nullable: true })
	@ManyToOne(() => Entreprise, (entreprise) => entreprise.travails, {
		primary: true,
	})
	@JoinColumn({
		name: 'num_entreprise',
		referencedColumnName: 'id',
	})
	public entreprise!: Entreprise;

	@Field()
	@Column({ name: 'nb_heures', type: 'integer' })
	public nbHeures!: number;

	@Field()
	@Column({ name: 'taux_heures', type: 'decimal' })
	public tauxHoraire!: number;

	@Field()
	@Column({
		name: 'date_embauche',
		type: 'date',
		default: 'NOW()',
		update: false,
	})
	dateEmbauche!: Date;

	constructor(
		employe: Employe,
		entreprise: Entreprise,
		nbHeures: number,
		tauxHoraire: number
	) {
		super();
		this.employe = employe;
		this.entreprise = entreprise;
		this.nbHeures = nbHeures;
		this.tauxHoraire = tauxHoraire;
	}
}
