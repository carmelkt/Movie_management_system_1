using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class ModifiedTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Actor_actorsactorID",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_actorsactorID",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "actorsactorID",
                table: "Movies");

            migrationBuilder.AddColumn<int>(
                name: "actorID",
                table: "Movies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_actorID",
                table: "Movies",
                column: "actorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Actor_actorID",
                table: "Movies",
                column: "actorID",
                principalTable: "Actor",
                principalColumn: "actorID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Actor_actorID",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_actorID",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "actorID",
                table: "Movies");

            migrationBuilder.AddColumn<int>(
                name: "actorsactorID",
                table: "Movies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_actorsactorID",
                table: "Movies",
                column: "actorsactorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Actor_actorsactorID",
                table: "Movies",
                column: "actorsactorID",
                principalTable: "Actor",
                principalColumn: "actorID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
