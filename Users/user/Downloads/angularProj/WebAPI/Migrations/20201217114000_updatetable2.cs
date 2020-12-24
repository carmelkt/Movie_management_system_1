using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class updatetable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Actor_actorID",
                table: "Movies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Actor",
                table: "Actor");

            migrationBuilder.RenameTable(
                name: "Actor",
                newName: "Actors");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Actors",
                table: "Actors",
                column: "actorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Actors_actorID",
                table: "Movies",
                column: "actorID",
                principalTable: "Actors",
                principalColumn: "actorID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Actors_actorID",
                table: "Movies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Actors",
                table: "Actors");

            migrationBuilder.RenameTable(
                name: "Actors",
                newName: "Actor");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Actor",
                table: "Actor",
                column: "actorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Actor_actorID",
                table: "Movies",
                column: "actorID",
                principalTable: "Actor",
                principalColumn: "actorID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
