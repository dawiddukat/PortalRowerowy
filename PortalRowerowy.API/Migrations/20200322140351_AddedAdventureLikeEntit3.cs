using Microsoft.EntityFrameworkCore.Migrations;

namespace PortalRowerowy.API.Migrations
{
    public partial class AddedAdventureLikeEntit3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TypeBicycle",
                table: "Adventures",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Adventures");
        }
    }
}
