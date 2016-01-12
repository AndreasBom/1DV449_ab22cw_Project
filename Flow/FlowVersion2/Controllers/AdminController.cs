using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Flow.Views.Admin;

namespace FlowVersion2.Controllers
{
    public class AdminController : Controller
    {
        private AdminChangeViewModel model = new AdminChangeViewModel();

        // GET: Admin. Requires user to log in with ab22cw@gmail.com

        //[Authorize(Roles = "admin")]
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