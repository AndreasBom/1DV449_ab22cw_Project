using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Flow.Models
{
    public class Icon
    {
        public string Description { get; set; }
        public string Id { get; set; }
        public DateTime ModifiedTime { get; set; }
        public string Base64 { get; set; }
        public string Url { get; set; }


        public Icon(JToken item)
        {
            Description = (string)item["Description"];
            Id = (string)item["Id"];
            ModifiedTime = (DateTime) item["ModifiedTime"];
            Base64 = (string) item["Base64"];
            Url = (string) item["Url"];
        }
    }
}
