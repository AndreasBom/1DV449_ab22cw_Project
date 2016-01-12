namespace FlowVersion2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumnStartLocation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "StartLocation", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "StartLocation");
        }
    }
}
