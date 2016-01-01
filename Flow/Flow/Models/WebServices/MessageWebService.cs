using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Xml.Linq;
using Newtonsoft.Json.Linq;
using Owin;

namespace Flow.Models.WebServices
{
    public class MessageWebService : MessageWebServiceBase
    {
        private int _countyNo;

        public MessageWebService()
        {
            //Reading config.xml for default location
            var path = HttpContext.Current.Request.MapPath("~/App_Data/XML/config.xml");
            XDocument doc = XDocument.Load(path);
            
            _countyNo = (int)(from c in doc.Descendants("county")
                                       select c).FirstOrDefault();
        }

        public IEnumerable<Icon> GetIcons()
        {
            string request = "<REQUEST> " +
                   "<LOGIN authenticationkey = '" + Authenticationkey + "' />" +
                   "<QUERY objecttype='Icon'>" +
                   "<FILTER>" +
                   "<EQ name = 'CountyNo' value='" + _countyNo + "' />" +
                   "</FILTER>" +
                   "</QUERY>" +
                   "</REQUEST>";

            var json = FetchJsonData(request);
            var result = (from item in json["RESPONSE"]["RESULT"][0]["Icon"]
                          select new Icon(item)).ToList();
            return result;
        }

        public IEnumerable<RoadCondition> GetRoadConditions()
        {
            string request = "<REQUEST> " +
                   "<LOGIN authenticationkey = '" + Authenticationkey + "' />" +
                   "<QUERY objecttype='RoadCondition'>" +
                   "<INCLUDE>Id</INCLUDE>" +
                   "<INCLUDE>ModifiedTime</INCLUDE>" +
                   "<INCLUDE>ConditionCode</INCLUDE>" +
                   "<INCLUDE>ConditionInfo</INCLUDE>" +
                   "<INCLUDE>ConditionText</INCLUDE>" +
                   "<INCLUDE>CountyNo</INCLUDE>" +
                   "<INCLUDE>Creator</INCLUDE>" +
                   "<INCLUDE>LocationText</INCLUDE>" +
                   "<INCLUDE>RoadNumber</INCLUDE>" +
                   "<INCLUDE>RoadNumberNumeric</INCLUDE>" +
                   "<INCLUDE>StartTime</INCLUDE>" +
                   "<INCLUDE>Cause</INCLUDE>" +
                   "<INCLUDE>Geometry.WGS84</INCLUDE>" +
                   "<FILTER>" +
                   "<EQ name = 'CountyNo' value='" + _countyNo + "' />" +
                   "</FILTER>" +
                   "</QUERY>" +
                   "</REQUEST>";
            var json = FetchJsonData(request);

            var result = (from item in json["RESPONSE"]["RESULT"][0]["RoadCondition"]
                          select new RoadCondition(item)).ToList();

            //FOR DEV
            //string request = "";
            //var path = HttpContext.Current.Server.MapPath("~/App_Data/RoadCondition.json");
            //var pathShort = HttpContext.Current.Server.MapPath("~/App_Data/ShortRoadCondition.json");
            //using (var reader = new StreamReader(pathShort))
            //{
            //    request = reader.ReadToEnd();
            //}

            ////var json = FetchJsonData(request);
            //var json = JObject.Parse(request);
            //var result = (from item in json["RESPONSE"]["RESULT"][0]["RoadCondition"]
            //              select new RoadCondition(item)).ToList();

            //Write number of warnings in config.xml
            var warnings = result.Count(m => m.Cause != null);
            WriteToConfig(warnings);

            return result;
        }

        

        public IEnumerable<RoadConditionOverview> GetRoadConditionOverviews()
        {
            string request = "<REQUEST> " +
                   "<LOGIN authenticationkey = '" + Authenticationkey + "' />" +
                   "<QUERY objecttype='RoadConditionOverview'>" +
                   "<FILTER>" +
                   "<EQ name = 'CountyNo' value='" + _countyNo + "' />" +
                   "</FILTER>" +
                   "</QUERY>" +
                   "</REQUEST>";
            var json = FetchJsonData(request);

            var result = (from item in json["RESPONSE"]["RESULT"][0]["RoadConditionOverview"]
                          select new RoadConditionOverview(item)).ToList();

            //For Development
            //string request = "";
            //var path = HttpContext.Current.Server.MapPath("~/App_Data/RoadConditionOverview.json");
            ////var pathShort = HttpContext.Current.Server.MapPath("~/App_Data/ShortRoadCondition.json");
            //using (var reader = new StreamReader(path))
            //{
            //    request = reader.ReadToEnd();
            //}

            ////var json = FetchJsonData(request);
            //var json = JObject.Parse(request);
            //var result = (from item in json["RESPONSE"]["RESULT"][0]["RoadConditionOverview"]
            //              select new RoadConditionOverview(item)).ToList();

            return result;
        }

        private void WriteToConfig(int number)
        {
            var path = HttpContext.Current.Request.MapPath("~/App_Data/XML/config.xml");
            XDocument doc = XDocument.Load(path);
            var selectedCounty = (from c in doc.Descendants("config")
                                  select c).FirstOrDefault();

            selectedCounty.SetElementValue("warnings", number);
            doc.Save(path);
        }
    }
}
