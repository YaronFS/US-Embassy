using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using test.ViewModels;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using test.Models;
using System.Security.Claims;

namespace test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        // AccuWeather API Key
        private readonly string apiKey = "wx8sKvbdsyzzA8Eo6gJLKAZxGq9MK4ez";

        private readonly WeatherAppContext db = new WeatherAppContext();

        // GET: api/Weather
        [HttpGet("Search")]
        public List<Location> Get(string query)
        {
            // Creating the relevant url with query.
            string url = String.Format("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + apiKey + "&q=" + query);
            WebRequest myRequest = WebRequest.Create(url);
            myRequest.Method = "GET";

            HttpWebResponse response = (HttpWebResponse)myRequest.GetResponse();

            // Reading the response.
            string responseBody = null;
            using (Stream stream = response.GetResponseStream())
            {
                StreamReader streamReader = new StreamReader(stream);
                responseBody = streamReader.ReadToEnd();
                streamReader.Close();
            }

            dynamic jsonResponse = JsonConvert.DeserializeObject(responseBody);

            List<Location> locationsList = new List<Location>();

            if(jsonResponse != null)
            {
                // Adding results (locations) to the locations list.
                foreach (var item in jsonResponse)
                {
                    locationsList.Add(new Location()
                    {
                        key = item.Key,
                        name = item.LocalizedName.Value,
                    });
                }
            }

            return locationsList;
        }



        [HttpGet("GetCurrentWeather")]
        public CurrentWeather GetCurrentWeather(int locationId)
        {
            // Here we need to check if current location exists in DB --> If yes, get from DB, else, call api.
            Locations locationFromDB = db.Locations.FirstOrDefault(i => i.LocationId == locationId);

            CurrentWeather curWeather;

            // Check if we found locationId in DB --> If yes, return it to client.
            if (locationFromDB != null)
            {
                curWeather = new CurrentWeather()
                {
                    key = locationId,
                    weatherText = locationFromDB.WeatherText,
                    temperature = locationFromDB.Temperature,
                    isOnFavorites = true
                };
            }
            // Here we know that we didn't find locationId in DB --> Send API request.
            else
            {
                // Creating the http request.
                string url = String.Format("http://dataservice.accuweather.com/currentconditions/v1/" + locationId + "?apikey=" + apiKey);
                WebRequest myRequest = WebRequest.Create(url);
                myRequest.Method = "GET";
                myRequest.ContentType = "application/json; charset=utf-8";

                HttpWebResponse response = (HttpWebResponse)myRequest.GetResponse();

                // Reading the response.
                string responseBody = null;
                using (Stream stream = response.GetResponseStream())
                {
                    StreamReader streamReader = new StreamReader(stream);
                    responseBody = streamReader.ReadToEnd();
                    streamReader.Close();
                }

                dynamic jsonResponse = JsonConvert.DeserializeObject(responseBody);

                curWeather = new CurrentWeather()
                {
                    key = locationId,
                    weatherText = jsonResponse[0].WeatherText,
                    temperature = jsonResponse[0].Temperature.Metric.Value,
                    isOnFavorites = false
                };
            }

            return curWeather;
        }



        [HttpGet("GetAllFavorites")]
        public List<WeatherVM> GetAllFavorites()
        {
            List<WeatherVM> favoritesList = new List<WeatherVM>();

            // Getting all user's favorite locations from db.
            favoritesList = (from Locations L in db.Locations
                             where true
                             select new WeatherVM()
                             {
                                 key = L.LocationId,
                                 name = L.Name,
                                 temperature = L.Temperature,
                                 weatherText = L.WeatherText
                             }).OrderBy(i => i.name).ToList();

            return favoritesList;
        }



        // POST: api/Weather
        [HttpPost]
        public void Post([FromBody] WeatherVM weather)
        {
            if(ModelState.IsValid)
            {
                if(weather.key >= 0 && weather.weatherText != String.Empty && weather.temperature != null)
                {
                    // Make sure current location is not exists in DB.
                    Locations locationFromDB = db.Locations.FirstOrDefault(i => i.LocationId == weather.key);

                    // Important !!!
                    // We are not supposed to get here.
                    // Check if we found location in DB --> Do nothing
                    if(locationFromDB != null)
                    {
                        return;
                    }


                    // Add location to favorites
                    db.Locations.Add(new Locations()
                    {
                        LocationId = weather.key,
                        Name = weather.name,
                        Temperature = (int)weather.temperature,
                        WeatherText = weather.weatherText
                    });


                    db.SaveChanges();
                }
            }
        }

        //// PUT: api/Weather/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            // Check if id is valid.
            if(id >= 0)
            {
                // Getting the relevant location from DB.
                Locations locationFromDB = db.Locations.FirstOrDefault(i => i.LocationId == id);

                // Check if we found the requested location in out DB --> If yes, remove it from DB.
                if(locationFromDB != null)
                {
                    db.Locations.Remove(locationFromDB);

                    db.SaveChanges();
                }
            }
        }
    }
}
