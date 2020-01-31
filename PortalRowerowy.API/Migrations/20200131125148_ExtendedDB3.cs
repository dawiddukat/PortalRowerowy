using Microsoft.EntityFrameworkCore.Migrations;

namespace PortalRowerowy.API.Migrations
{
    public partial class ExtendedDB3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Voivodeship",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Voivodeship",
                table: "Users");
        }
    }
}
