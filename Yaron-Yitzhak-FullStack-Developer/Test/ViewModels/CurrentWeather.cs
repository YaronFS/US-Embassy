using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace test.Models
{
    public class CurrentWeather
    {
        public int key { get; set; }
        public string weatherText { get; set; }
        public int temperature { get; set; }
        public bool isOnFavorites { get; set; }
    }
}
