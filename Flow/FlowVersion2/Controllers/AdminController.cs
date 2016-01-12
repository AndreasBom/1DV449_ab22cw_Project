using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Flow.Models.WebServices;
using Flow.Views.Admin;
using FlowVersion2.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace FlowVersion2.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private AdminChangeViewModel _model = new AdminChangeViewModel();
        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public AdminController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }

        public AdminController()
        {
            //Empty!
        }

        // GET:         
        public ActionResult Index()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                _model.StartLocation = user.StartLocation;
            }
            return View(_model);
        }



        [HttpPost]
        public ActionResult Save(FormCollection collection)
        {
            if (TryUpdateModel(_model, new[] { "StartLocation" }, collection))
            {
                var user = UserManager.FindById(User.Identity.GetUserId());
                user.StartLocation = Convert.ToInt32(collection["countyDropDownList"]);
                var result = UserManager.Update(user);
                TempData["savedToXml"] = "Inställningen sparades";
                
                //Remove items from cache
                MessageWebService.ClearCache();
            }
            else
            {
                TempData["savedToXml"] = "Fel!Försök igen.";
            }

            ////Saves new county to xml-file and saves a confirmaton message
            //_model.SelectedCounty = Convert.ToInt32(collection["countyDropDownList"]);
            //TempData["savedToXml"] = "Inställningen sparades";

            return View("Index", _model);
        }

    }
}