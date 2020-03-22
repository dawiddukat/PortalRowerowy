using Microsoft.EntityFrameworkCore.Migrations;

namespace PortalRowerowy.API.Migrations
{
    public partial class AddedAdventureLikeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "public_id",
                table: "SellBicyclePhotos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "public_id",
                table: "AdventurePhotos",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AdventureLikes",
                columns: table => new
                {
                    UserLikesAdventureId = table.Column<int>(nullable: false),
                    AdventureIsLikedId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdventureLikes", x => new { x.UserLikesAdventureId, x.AdventureIsLikedId });
                    table.ForeignKey(
                        name: "FK_AdventureLikes_Adventures_AdventureIsLikedId",
                        column: x => x.AdventureIsLikedId,
                        principalTable: "Adventures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdventureLikes_Users_UserLikesAdventureId",
                        column: x => x.UserLikesAdventureId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdventureLikes_AdventureIsLikedId",
                table: "AdventureLikes",
                column: "AdventureIsLikedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdventureLikes");

            migrationBuilder.DropColumn(
                name: "public_id",
                table: "SellBicyclePhotos");

            migrationBuilder.DropColumn(
                name: "public_id",
                table: "AdventurePhotos");
        }
    }
}
