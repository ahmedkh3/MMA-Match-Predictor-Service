namespace MatchPredictor.Model
{
    public class Fighter
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NickName { get; set; }
        public int Wins { get; set; }
        public int Loss { get; set; }
        public int Draws { get; set; }
        public double? Height { get; set; }
        public double? Weight { get; set; }
        public double? Reach { get; set; }
        public string? Stance { get; set; }
        public DateTime? Birthday { get; set; }
        public int TakedownAccuracy { get; set; }
        public int TakedownDefense { get; set; }
        public int SignificantStrikeAccuracy { get; set; }
        public int SignificantStrikeDefense { get; set; }
    }
}
