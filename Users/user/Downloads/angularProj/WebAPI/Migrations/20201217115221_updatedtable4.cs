using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class updatedtable4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Actors_actorID",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_actorID",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "actorID",
                table: "Movies");

            migrationBuilder.AddColumn<string>(
                name: "actors",
                table: "Movies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "actors",
                table: "Movies");

            migrationBuilder.AddColumn<int>(
                name: "actorID",
                table: "Movies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_actorID",
                table: "Movies",
                column: "actorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Actors_actorID",
                table: "Movies",
                column: "actorID",
                principalTable: "Actors",
                principalColumn: "actorID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
