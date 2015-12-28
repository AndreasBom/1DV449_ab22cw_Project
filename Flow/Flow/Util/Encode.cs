using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flow.Util
{
    public class Encode
    {
        public static string EncodeToSwe(string input)
        {
            if (input == null)
            {
                return null;
            }
            byte[] data = Encoding.Default.GetBytes(input);
            string output = Encoding.UTF8.GetString(data);

            return output;
        }
    }
}
