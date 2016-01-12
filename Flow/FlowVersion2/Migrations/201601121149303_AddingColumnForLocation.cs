namespace FlowVersion2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingColumnForLocation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "DefaultLocation", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "DefaultLocation");
        }
    }
}
