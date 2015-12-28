using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Flow.Models.WebServices
{
    public interface IMessageWebService
    {
        JObject FetchJsonData(string requestString);

    }
}
