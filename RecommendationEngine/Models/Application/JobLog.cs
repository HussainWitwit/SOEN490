﻿using System;

namespace Models.Application
{
    public class JobLog
    { 
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string Level { get; set; }
        public string Description { get; set; }
    }
}
