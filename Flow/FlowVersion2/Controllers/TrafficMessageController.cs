using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Flow.Models.WebServices;
using FlowVersion2.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using FlowVersion2.Models;

namespace FlowVersion2.Controllers
{
    public class TrafficMessagesController : Controller
    {
        private ApplicationUserManager _userManager;
        private int StartLocation { get; set; } = 13;

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

        public TrafficMessagesController()
        {
            //Empty
        }

        public TrafficMessagesController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }

        // GET: TrafficMessages
        public ActionResult RoadConditionsOverview()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                StartLocation = user.StartLocation;
            }
            

            var webClient = new MessageWebService(StartLocation);
            var result = webClient.GetRoadConditionOverviews();

            if (result == null)
            {
                return HttpNotFound();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RoadConditions()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                StartLocation = user.StartLocation;
            }

            var webClient = new MessageWebService(StartLocation);
            var result = webClient.GetRoadConditions();

            if (result == null)
            {
                return HttpNotFound();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}