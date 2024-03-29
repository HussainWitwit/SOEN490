﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("RecommendationJob")]
    public class DBRecommendationJob
    {
        [Key]
        public int RecommendationJobId { get; set; }
        public string Status { get; set; }
        public string TriggeredBy { get; set; }
        public int JobDuration { get; set; }
        public DateTime Timestamp { get; set; }
        public virtual DBRecommendationJobResult Result { get; set; }
        public virtual DBAsset Asset { get; set; }
        public virtual DBRecommendationSchedule Schedule { get; set; }
        public virtual ICollection<DBRecommendationJobLog> LogsList { get; set; }
    }
}