using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calculator.Models
{
    public class CalculatorModel
    {
        public string[] Keys {
            get { return new string[] { "9", "8", "7", "6", "5", "4", "3", "2", "1", "0" }; }
        }

        public CalculatorModel()
        {

        }
    }
}