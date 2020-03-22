using Microsoft.EntityFrameworkCore.Migrations;


namespace PortalRowerowy.API.Migrations
{
    public partial class AddedMessagesEntity2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateSend",
                table: "Messages",
                newName: "DateSent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateSent",
                table: "Messages",
                newName: "DateSend");
        }
    }
}
