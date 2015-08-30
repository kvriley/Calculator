using Calculator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Calculator.Controllers
{
    public class CalculatorController : Controller
    {
        public PartialViewResult ShowCalculator()
        {
            var cal = new CalculatorModel();

            return PartialView(cal);
        }
    }
}