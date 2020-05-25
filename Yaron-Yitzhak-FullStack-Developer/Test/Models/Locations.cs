using System;
using System.Collections.Generic;

namespace test.Models
{
    public partial class Locations
    {
        public int LocationId { get; set; }
        public string Name { get; set; }
        public int Temperature { get; set; }
        public string WeatherText { get; set; }
    }
}
