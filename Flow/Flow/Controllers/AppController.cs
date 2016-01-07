using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Flow.Views.Admin;

namespace Flow.Controllers
{
    [RequireHttps]
    public class AppController : Controller
    {
        // GET: App
        public ActionResult Index()
        {

            return View();
        }

        
    }
}