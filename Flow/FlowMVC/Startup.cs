using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FlowMVC.Startup))]
namespace FlowMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
