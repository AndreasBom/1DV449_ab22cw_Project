using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FlowVersion2.Startup))]
namespace FlowVersion2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
