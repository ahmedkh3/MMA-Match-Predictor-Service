using MatchPredictor.Model;
using System.Collections.Generic;

namespace MatchPredictor.Services
{
    public class PredictionService
    {
        

        public Fighter PredictWinner(Fighter fighter1, Fighter fighter2)
        {
            double f1 = 0.00;
            double f2 = 0.00;
            //weight checking
            if (megaAdvantageThisGuyCanNOTWin(fighter1, fighter2))
            {
                return fighter2;
            }
            if(megaAdvantageThisGuyCanNOTWin(fighter2, fighter1))
            {
                return fighter1;
            }
            var weight = EdgeGiver(fighter1, fighter2, fighter => (double)fighter.Weight);
            if (weight == fighter1)
            {
                addEdge(ref f1, .10);
                if (crazyAdvantage(fighter1, fighter2, fighter => (double)fighter.Weight, 10.0))
                {
                    addEdge(ref f1, .15);
                }
            }
            else
            {
                addEdge(ref f2, .10);
                if (crazyAdvantage(fighter2, fighter1, fighter => (double)fighter.Weight, 10.0))
                {
                    addEdge(ref f2, .15);
                }
            }
            
            //height checking
            var height = EdgeGiver(fighter1, fighter2, fighter => (double)fighter.Height);
            if (height == fighter1)
            {
                addEdge(ref f1, .10);
                if (crazyAdvantage(fighter1, fighter2, fighter => (double)fighter.Height, 7.0))
                {
                    addEdge(ref f1, .15);
                }
            }
            else
            {
                addEdge(ref f2, .10);
                if (crazyAdvantage(fighter2, fighter1, fighter => (double)fighter.Height, 7.0))
                {
                    addEdge(ref f2, .15);
                }
            }
            //reach checking
            var reach = EdgeGiver(fighter1, fighter2, fighter => (double)fighter.Reach);
            if (reach == fighter1)
            {
                addEdge(ref f1, .10);
                if (crazyAdvantage(fighter1, fighter2, fighter => (double)fighter.Reach, 5.0))
                {
                    addEdge(ref f1, .15);
                }
            }
            else
            {
                addEdge(ref f2, .10);
                if (crazyAdvantage(fighter2, fighter1, fighter => (double)fighter.Weight, 5.0))
                {
                    addEdge(ref f2, .15);
                }
            }
            
            //win percentage calculator
            //gets fighter 1 k/d ratio
            var k1 = (double)fighter1.Wins;
            var d1 = (double)fighter1.Loss;
            double kd1 = k1 / d1;
             kd1 = d1 != 0 ? k1 / d1 : k1;
            

            //gets figher2 k/d ratio
            var k2 = (double)fighter2.Wins;
            var d2 = (double)fighter2.Loss;
            double kd2 = k2 / d2;
            kd2 = d2 != 0 ? k2 / d2 : k2;
            if (kd1 > kd2)
            {
                addEdge(ref f1, .05);
            }
            else
            {
                addEdge(ref f2, .05);
            }

            //combat logic
            var significantStrikeF1 = (double)fighter1.SignificantStrikeAccuracy;
            var significantStrikeF2 = (double)fighter2.SignificantStrikeAccuracy;

            var significantStrikeDefF1 = (double)fighter1.SignificantStrikeDefense;
            var significantStrikeDefF2 = (double)fighter2.SignificantStrikeDefense;

            var takeDownAccuracyF1 = (double)fighter1.TakedownAccuracy;
            var takeDownAccuracyF2 = (double)fighter2.TakedownAccuracy;

            var takeDownDefenseF1 = (double)fighter1.TakedownDefense;
            var takeDownDefenseF2 = (double)fighter2.TakedownDefense;

            //if fighter1 got hands but fighter2 got 0 hands, fighter1 is f'ing him up
            if(significantStrikeF1>50.00&&significantStrikeDefF2<20.00)
            {
                //give fighter 1 a 20% increase of winning
                addEdge(ref f1, 20.00);
            }

            //repeat for fighter2
            if (significantStrikeF2 > 50.00 && significantStrikeDefF1 < 20.00)
            {
                addEdge(ref f2, 20.00);
            }

            //grappling advantage
            if (takeDownAccuracyF1 > 50.00 && takeDownDefenseF2 < 20.00)
            {
                
                addEdge(ref f1, 20.00);
            }

            
            if (takeDownAccuracyF2 > 50.00 && takeDownDefenseF1< 20.00)
            {
                addEdge(ref f2, 20.00);
            }
            //defensive advantage
            if (significantStrikeDefF1 > 50.00 && significantStrikeF2 < 20.00)
            {
                //give fighter 1 a 20% increase of winning
                addEdge(ref f1, 10.00);
            }

            //repeat for fighter2
            if (significantStrikeDefF2 > 50.00 && significantStrikeF1 < 20.00)
            {
                addEdge(ref f2, 10.00);
            }
            //even matched
            if (significantStrikeDefF1 > 50.00 && significantStrikeF2 > 50.00)
            {
                //give both fighters a 5% increase of winning because they both are highly skilled, but a caveat..
                addEdge(ref f1, 5.00);
                addEdge(ref f2, 5.00);
                //the caveat is at this point whoever has higher def or off give 5 percent more
                if (significantStrikeDefF1 > significantStrikeF2)
                {
                    addEdge(ref f1, 5.00);
                }
                else
                {
                    addEdge(ref f2, 5.00);
                }
                //also see who has higher grappling at this point
                if (takeDownAccuracyF1 > takeDownAccuracyF2 && takeDownAccuracyF2 < takeDownAccuracyF1)
                {
                    addEdge(ref f1, .05);
                }
                else if (takeDownAccuracyF2 > takeDownAccuracyF1 && takeDownAccuracyF1 < takeDownAccuracyF1)
                {
                    addEdge(ref f2, .05);
                }
                else if (takeDownAccuracyF1 > takeDownAccuracyF2)
                {
                    addEdge(ref f1, .05);
                }
                else
                {
                    addEdge(ref f2, .05);
                }
                //even matched
                if (significantStrikeDefF2 > 50.00 && significantStrikeF1 > 50.00)
                {
                    //give both fighters a 5% increase of winning because they both are highly skilled, but a caveat..
                    addEdge(ref f1, 5.00);
                    addEdge(ref f2, 5.00);
                    //the caveat is at this point whoever has higher def or off give 5 percent more
                    if (significantStrikeDefF1 > significantStrikeF2)
                    {
                        addEdge(ref f1, 5.00);
                    }
                    else
                    {
                        addEdge(ref f2, 5.00);
                    }
                    //also see who has higher grappling at this point
                    if (takeDownAccuracyF1 > takeDownAccuracyF2 && takeDownAccuracyF2 < takeDownAccuracyF1)
                    {
                        addEdge(ref f1, .05);
                    }
                    else if (takeDownAccuracyF2 > takeDownAccuracyF1 && takeDownAccuracyF1 < takeDownAccuracyF1)
                    {
                        addEdge(ref f2, .05);
                    }
                    else if (takeDownAccuracyF1 > takeDownAccuracyF2)
                    {
                        addEdge(ref f1, .05);
                    }
                    else
                    {
                        addEdge(ref f2, .05);
                    }


                }
                // Same process for grappling first then checking striking
                if (takeDownAccuracyF1 > 50.00 && takeDownAccuracyF2 > 50.00)
                {
                    // Give both fighters a 5% increase of winning because they both are highly skilled in grappling
                    addEdge(ref f1, 5.00);

                    addEdge(ref f2, 5.00);

                    // The caveat is at this point whoever has higher grappling accuracy gets 5 percent more
                    if (takeDownAccuracyF1 > takeDownAccuracyF2)
                    {
                        addEdge(ref f1, 5.00);
                    }
                    else
                    {
                        addEdge(ref f2, 5.00);
                    }

                    // Also see who has higher striking accuracy at this point
                    if (significantStrikeF1> significantStrikeF2)
                    {
                        addEdge(ref f1, .05);
                    }
                    else if (significantStrikeF2 > significantStrikeF1)
                    {
                        addEdge(ref f2, .05);
                    }
                }
                //strikers are better than 
                if (significantStrikeF1 > 20 && takeDownAccuracyF2 > 20)
                {
                    addEdge(ref f1, .05);
                }
                if (significantStrikeF2> 20 && takeDownAccuracyF1 > 20)
                {
                    addEdge(ref f2, .05);
                }
                
               
            }


            Fighter winner = new Fighter();
            if (f1 > f2)
            {
                winner = fighter1;
            }
            else
            {
                winner = fighter2;
            }
            return winner;
        }
        public static Fighter EdgeGiver(Fighter fighter1, Fighter fighter2, Func<Fighter, double> propertySelector)
        {
            double fighter1Stat = propertySelector(fighter1);
            double fighter2Stat = propertySelector(fighter2);
            if (fighter1Stat>fighter2Stat)
            {
                return fighter1;
            }
            else if(fighter1Stat < fighter2Stat)
            {
                return fighter2;
            }
            else
            {
                return null;
            }
            
        }
        public static void addEdge(ref double edge, double adder)
        {
            edge += adder;
        }
        public static bool crazyAdvantage(Fighter fighter1, Fighter fighter2, Func<Fighter, double> propertySelector, double x)
        {
            double fighter1Stat = propertySelector(fighter1);
            double fighter2Stat = propertySelector(fighter2);
            if (fighter1Stat > fighter2Stat + x)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public static bool megaAdvantageThisGuyCanNOTWin(Fighter fighter1, Fighter fighter2)
        {
            if (fighter1.Weight + 20.00 < fighter2.Weight)
            {
                return true;
            }
            return false;
        }
    }
}
