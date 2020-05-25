using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace test.ViewModels
{
    public class WeatherVM
    {
        public int key { get; set; }
        public string name { get; set; }
        public int? temperature { get; set; }
        public string weatherText { get; set; }
    }
}
