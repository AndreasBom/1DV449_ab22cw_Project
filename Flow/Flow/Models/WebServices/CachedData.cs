using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Caching;

namespace Flow.Models.WebServices
{
    public class CachedData
    {
        private static readonly MemoryCache Cache = MemoryCache.Default;

        //Returns object from cache memory
        public object GetCache(string keyName)
        {
            try
            {
                return Cache.Get(keyName);
            }
            catch (Exception)
            {
                throw new ApplicationException("Could not get data from cache memory");
            }
        }



        /// <summary>
        /// Saves object to cache memory. 
        /// </summary>
        /// <param name="keyName">cache memory space</param>
        /// <param name="objectToCache">object to save</param>
        /// <param name="cacheItemPolicy">cache duration</param>
        public void SetCache(string keyName, object objectToCache, int cacheItemPolicy)
        {
            try
            {
                var cacheObject = new CacheItem(keyName, objectToCache);
                var policy = new CacheItemPolicy
                {
                    AbsoluteExpiration = new DateTimeOffset(DateTime.UtcNow.AddMinutes(cacheItemPolicy))
                };

                Cache.Add(cacheObject.Key, cacheObject.Value, policy);
            }
            catch (Exception)
            {
                throw new ApplicationException("Could not save object to cache memory");
            }
        }

        //Checks if cache key exists
        public bool HasValue(string keyName)
        {
            return Cache.Contains(keyName);
        }


        //Remove object from cache 
        public void RemoveCache(string keyName)
        {
            try
            {
                Cache.Remove(keyName);
            }
            catch (ArgumentNullException)
            {
                throw new ArgumentNullException();
            }
            catch (Exception)
            {

                throw new ApplicationException("Could not delete object from cache memory");
            }
        }
    }
}
