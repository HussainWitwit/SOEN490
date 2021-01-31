namespace Models.Application.Asset
{
    public abstract class Asset
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public string TimeZone { get; set; }
        public string ElementPath { get; set; }
        public string AssetType { get; set; }
        public double AcPower { get; set; }
    }
}