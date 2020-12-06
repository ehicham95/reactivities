using System;
using System.Collections.Generic;
using Domain;
using Newtonsoft.Json;

namespace Application.activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTime Date { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        //We add JSonProperty to get datas from attendees and keeping UserActivities for mapping
        [JsonProperty("attendees")]
        public ICollection<AttendeeDto> UserActivities { get; set; }
    }
}