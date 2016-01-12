using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;


namespace Flow.Models.WebServices
{
    public abstract class MessageWebServiceBase : IMessageWebService
    {
        protected readonly Uri ApiUrl = new Uri(@"http://api.trafikinfo.trafikverket.se/v1.1/data.json");
        protected readonly string Authenticationkey = ConfigurationManager.AppSettings["apiKey"];
        protected WebClient Webclient;
        protected CachedData CachedData = new CachedData();

        protected MessageWebServiceBase()
        {
            Webclient = new WebClient();
            Webclient.Headers.Add("Referer", "Programmeringsstudent Linneuniversitetet: http://andreasbom.se");
        }

        public JObject FetchJsonData(string requestString, string cacheName)
        {
            if (CachedData.HasValue(cacheName))
            {
                return CachedData.GetCache(cacheName) as JObject;
            }

            try
            {
                var response = Webclient.UploadString(ApiUrl, "post", requestString);
                var jobj = JObject.Parse(response);

                CachedData.SetCache(cacheName, jobj, 300);
                return jobj;
            }
            catch (Exception)
            {
                throw new ApplicationException("Error while fetching data");
            }

        }
    }
}
