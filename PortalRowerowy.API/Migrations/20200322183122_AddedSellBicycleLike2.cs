using Microsoft.EntityFrameworkCore.Migrations;

namespace PortalRowerowy.API.Migrations
{
    public partial class AddedSellBicycleLike2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SellBicycleLikes",
                columns: table => new
                {
                    UserLikesSellBicycleId = table.Column<int>(nullable: false),
                    SellBicycleIsLikedId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SellBicycleLikes", x => new { x.UserLikesSellBicycleId, x.SellBicycleIsLikedId });
                    table.ForeignKey(
                        name: "FK_SellBicycleLikes_SellBicycles_SellBicycleIsLikedId",
                        column: x => x.SellBicycleIsLikedId,
                        principalTable: "SellBicycles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SellBicycleLikes_Users_UserLikesSellBicycleId",
                        column: x => x.UserLikesSellBicycleId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SellBicycleLikes_SellBicycleIsLikedId",
                table: "SellBicycleLikes",
                column: "SellBicycleIsLikedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SellBicycleLikes");
        }
    }
}
