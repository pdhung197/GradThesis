using Microsoft.EntityFrameworkCore.Migrations;

namespace DataModels.Migrations
{
    public partial class AddAttachmentToPromotionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AttachmentId",
                table: "Promotions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Promotions_AttachmentId",
                table: "Promotions",
                column: "AttachmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Promotions_Attachments_AttachmentId",
                table: "Promotions",
                column: "AttachmentId",
                principalTable: "Attachments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Promotions_Attachments_AttachmentId",
                table: "Promotions");

            migrationBuilder.DropIndex(
                name: "IX_Promotions_AttachmentId",
                table: "Promotions");

            migrationBuilder.DropColumn(
                name: "AttachmentId",
                table: "Promotions");
        }
    }
}
