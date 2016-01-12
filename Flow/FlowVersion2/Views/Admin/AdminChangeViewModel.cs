using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using Flow.Models.WebServices;

namespace Flow.Views.Admin
{

    public class AdminChangeViewModel
    {
        //Path to config.xml
        private readonly string path = HttpContext.Current.Request.MapPath("~/App_Data/XML/config.xml");

        public IDictionary<string, int> GetCounties => counties;

        public int StartLocation { get; set; }
        //public int SelectedCounty
        //{
        //    get
        //    {
        //        XDocument doc = XDocument.Load(path);
        //        var selectedCounty = (int)(from c in doc.Descendants("county")
        //            select c).FirstOrDefault();

        //        return selectedCounty;
        //    }
        //    set
        //    {
        //        XDocument doc = XDocument.Load(path);
        //        var selectedCounty = (from c in doc.Descendants("config")
        //                                   select c).FirstOrDefault();

        //        selectedCounty.SetElementValue("county", value);
        //        doc.Save(path);
        //    }
        //}
        

        private readonly Dictionary<string, int>  counties = new Dictionary<string, int>
        {
            {"Stockholm",1},
            {"Uppsala",3},
            {"Södermanland", 4},
            {"Östergötland",5},
            {"Jönköping",6},
            {"Kronoberg",7},
            {"Kalmar",8},
            {"Gotland",9},
            {"Blekinge",10},
            {"Skåne",12},
            {"Halland",13},
            {"VästraGötaland",14},
            {"Värmland",17},
            {"Örebro",18},
            {"Västmanland", 19},
            {"Dalarna",20 },
            {"Gävleborg",21},
            {"Västernorrland",22},
            {"Jämtland",23},
            {"Västerbotten",24},
            {"Norrbotten",25}
        };
    }

    
}
