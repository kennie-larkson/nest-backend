import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
} from 'typeorm';
import { ulid } from 'ulid';

export abstract class BaseEntity {
  @PrimaryColumn('char', { length: 26 })
  id!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }

  @BeforeInsert()
  setCreationMetadata() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdateMetadata() {
    this.updatedAt = new Date();
  }
}
