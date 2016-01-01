using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Flow.Views.Admin;
using Microsoft.AspNet.Identity;

namespace Flow.Controllers
{
    
    public class AdminController : Controller
    {
        private AdminChangeViewModel model = new AdminChangeViewModel();
        
        // GET: Admin. Requires user to log in. ab22cw@gmail.com is registered as admin
        [RequireHttps]
        [Authorize(Roles = "admin")]
        public ActionResult Index()
        {
            return View(model);
        }

        [HttpPost]
        public ActionResult Save(FormCollection collection)
        {
            //Saves new county to xml-file and saves a confirmaton message
            model.SelectedCounty = Convert.ToInt32(collection["countyDropDownList"]);
            TempData["savedToXml"] = "Inställningen sparades";

            return View("Index", model);
        }

    }
}