using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json.Linq;

namespace Flow.Models
{
    public class RoadCondition
    {
        public string Cause { get; set; }
        public int? ConditionCode { get; set; }
        public string ConditionInfo { get; set; }
        public string ConditionText { get; set; }
        public int CountyNo { get; set; }
        public string Creator { get; set; }
        public string IconId { get; set; }
        public string Id { get; set; }
        public string LocationText { get; set; }
        public DateTime ModifiedTime { get; set; }
        public string RoadNumber { get; set; }
        public int? RoadNumberNumric { get; set; }
        public DateTime? StartTime { get; set; }
        public string Warning { get; set; }
        public string WGS84 { get; set; }
        public string Measurement { get; set; }

        public RoadCondition(JToken item)
        {
            Id = item.Value<string>("Id");
            try
            {
                Cause = Util.Encode.EncodeToSwe((string)item["Cause"][0]);
            }
            catch (Exception)
            {
                Cause = null;
            }
            try
            {
                ConditionInfo = Util.Encode.EncodeToSwe((string) item["ConditionInfo"]);
            }
            catch
            {
                ConditionInfo = null;
            }
            try
            {
                Measurement = Util.Encode.EncodeToSwe((string) item["Measurement"]);
            }
            catch (Exception)
            {
                Measurement = null;
                throw;
            }

            ConditionCode = item.Value<int?>("ConditionCode");
            ConditionText = Util.Encode.EncodeToSwe(item.Value<string>("ConditionText"));
            CountyNo = item["CountyNo"][0].Value<int>();
            Creator = Util.Encode.EncodeToSwe(item.Value<string>("Creator"));
            IconId = Util.Encode.EncodeToSwe(item.Value<string>("IconId"));
            LocationText = Util.Encode.EncodeToSwe(item.Value<string>("LocationText"));
            //ModifiedTime = DateTime.ParseExact(item["ModifiedTime"].ToString(), "yyyy-MM-dd HH:mm:ss", null).ToString("yyyy-MM-dd HH:mm:ss");
            ModifiedTime = item.Value<DateTime>("ModifiedTime");
            RoadNumber = Util.Encode.EncodeToSwe(item.Value<string>("RoadNumber"));
            RoadNumberNumric = item.Value<int>("RoadNumberNumeric");
            StartTime = item.Value<DateTime>("StartTime");
            try
            {
                WGS84 = Util.Encode.EncodeToSwe((string)item["Geometry"]["WGS84"]);
            }
            catch (Exception)
            {
                WGS84 = null;
            }
            try
            {
                Warning = Util.Encode.EncodeToSwe((string)item["Warning"][0]);
            }
            catch (Exception)
            {
                Warning = null;
            }


        }

    }
}
