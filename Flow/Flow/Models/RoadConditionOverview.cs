using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Flow.Models
{
    public class RoadConditionOverview
    {
        public int CountyNo { get; set; }
        //public DateTime EndTime { get; set; }
        public string SWEREF99TM { get; set; }
        public string WGS84 { get; set; }

        public double Lng
        {
            get
            {
                string number = Regex.Match(WGS84, @"\d+.\d+ \d+.\d+").Value;
                string numParsed = number.Replace(".", ",");
                var lat = numParsed.Split(null);
                return double.Parse(lat[0]);
            }
        }

        public double Lat
        {
            get
            {
                string number = Regex.Match(WGS84, @"\d+.\d+ \d+.\d+").Value;
                string numParsed = number.Replace(".", ",");
                var lng = numParsed.Split(null);
                return double.Parse(lng[1]);
            }
        }
        public string Id { get; set; } 
        public string LocationText { get; set; }
        public DateTime ModifiedTime { get; set; }
        //public DateTime StartTime { get; set; }
        public string Text { get; set; }
        //public bool ValidUntilFurtherNotice { get; set; }


        public RoadConditionOverview(JToken item)
        {
            Id = item.Value<string>("Id");
            CountyNo = (int)item["CountyNo"][0];
            //StartTime = DateTime.ParseExact(item["StartTime"].ToString(), "yyyy-MM-dd HH:mm:ss", null);
            //EndTime = DateTime.ParseExact(item["EndTime"].ToString(), "yyyy-MM-dd HH:mm:ss", null);
            LocationText = Util.Encode.EncodeToSwe(item.Value<string>("LocationText"));
            //ModifiedTime = DateTime.ParseExact(item["ModifiedTime"].ToString(), "yyyy-MM-dd HH:mm:ss", null).ToString("yyyy-MM-dd HH:mm:ss");            
            ModifiedTime = (DateTime) item.Value<DateTime>("ModifiedTime");           
            Text = Util.Encode.EncodeToSwe(item.Value<string>("Text"));
            WGS84 = (string) item["Geometry"]["WGS84"];
        }

    }
}
