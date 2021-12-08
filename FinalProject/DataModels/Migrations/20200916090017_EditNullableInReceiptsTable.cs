using Microsoft.EntityFrameworkCore.Migrations;

namespace DataModels.Migrations
{
    public partial class EditNullableInReceiptsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReceiptMaterials_Providers_ProviderId",
                table: "ReceiptMaterials");

            migrationBuilder.AlterColumn<long>(
                name: "UnitPrice",
                table: "ReceiptMaterials",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "ProviderId",
                table: "ReceiptMaterials",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiptMaterials_Providers_ProviderId",
                table: "ReceiptMaterials",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReceiptMaterials_Providers_ProviderId",
                table: "ReceiptMaterials");

            migrationBuilder.AlterColumn<long>(
                name: "UnitPrice",
                table: "ReceiptMaterials",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProviderId",
                table: "ReceiptMaterials",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiptMaterials_Providers_ProviderId",
                table: "ReceiptMaterials",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
