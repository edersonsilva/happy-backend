import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addFoodtruckIdToProducts1605182744437 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'foodtruck_id',
                type: 'integer',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                name: 'ProductFoodtruck',
                columnNames: ['foodtruck_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'foodtrucks',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
             }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductFoodtruck');
        await queryRunner.dropColumn('products', 'foodtruck_id');
    }

}
