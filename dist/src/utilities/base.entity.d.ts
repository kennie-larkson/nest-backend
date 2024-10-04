export declare abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    generateId(): void;
    setCreationMetadata(): void;
    setUpdateMetadata(): void;
}
