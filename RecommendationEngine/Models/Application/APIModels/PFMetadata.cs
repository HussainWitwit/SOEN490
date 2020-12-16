using System.Collections.Generic;

namespace Models.Application.APIModels
{
    public class PFMetadata
    {
        public string ElementPath { get; set; }
        public Dictionary<string, dynamic> Metadata { get; set; }
    }
}