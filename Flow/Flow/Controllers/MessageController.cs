using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Flow.Models;
using Flow.Models.WebServices;

namespace Flow.Controllers
{
    
    [RequireHttps]
    
    public class MessageController : ApiController
    {
        //public IEnumerable<RoadConditionOverview> GetAllRoadConditions()
        //{
        //    var webClient = new MessageWebService();
        //    var result = webClient.GetRoadConditionOverviews();

        //    return result;
        //}

        [RequireHttps]
        public IHttpActionResult GetRoadConditionsOverview()
        {
            var webClient = new MessageWebService();
            var result = webClient.GetRoadConditionOverviews();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [RequireHttps]
        public IHttpActionResult GetRoadConditions()
        {
            var webClient = new MessageWebService();
            var result = webClient.GetRoadConditions();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }


    }
}
