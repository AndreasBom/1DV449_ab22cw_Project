using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Flow.Models.WebServices;

namespace FlowVersion2.Controllers
{
    public class TrafficMessagesController : Controller
    {
        // GET: TrafficMessages
        public ActionResult RoadConditionsOverview()
        {
            var webClient = new MessageWebService();
            var result = webClient.GetRoadConditionOverviews();

            if (result == null)
            {
                return HttpNotFound();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RoadConditions()
        {
            var webClient = new MessageWebService();
            var result = webClient.GetRoadConditions();

            if (result == null)
            {
                return HttpNotFound();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}