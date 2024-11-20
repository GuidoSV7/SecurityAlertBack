import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  photoUrl: string;

  @Column({ type: 'double precision' })
  longitude: number;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'uuid', nullable: true })
  parent_id: string;

  @ManyToOne(() => Complaint, complaint => complaint.children)
  @JoinColumn({ name: 'parent_id' }) 
  parent: Complaint;

  @OneToMany(() => Complaint, complaint => complaint.parent)
  children: Complaint[];
}
