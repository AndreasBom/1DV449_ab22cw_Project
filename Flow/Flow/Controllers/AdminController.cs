using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Microsoft.AspNet.Identity;

namespace Flow.Controllers
{
    
    public class AdminController : Controller
    {
        // GET: Admin
        [RequireHttps]
        [Authorize(Roles = "admin")]
        public ActionResult Index()
        {
            return View();
        }

    }
}