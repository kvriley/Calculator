
module.exports= function () {
    var ko = require("./knockout-2.2.0.js");

    var CalculatorModel = function () {
    var self = this;

    self.memoryCommands = ko.observableArray([
        { command: ' MC ', action: "MC" },
        { command: ' MR ', action: "MR" },
        { command: ' MS ', action: "MS" },
        { command: ' M+ ', action: "MPlus" },
        { command: ' M- ', action: "M-" },
    ]);

    self.commands = ko.observableArray([
        { command: ' * ', optional: ko.observable(false), selected: ko.observable(true) },
        { command: ' / ', optional: ko.observable(false), selected: ko.observable(true) },
    { command: '&#8730;', action: 'Math.sqrt(__param__)', optional: ko.observable(true), selected: ko.observable(true) },
    { command: ' + ', optional: ko.observable(false), selected: ko.observable(true) },
        { command: ' - ', optional: ko.observable(false), selected: ko.observable(true) },
    ]);

    self.optionalCommands = ko.observableArray([
    { command: 'sin', action: 'Math.sin(__param__)', optional: ko.observable(true), selected: ko.observable(true) },
    { command: 'cos', action: 'Math.cos(__param__)', optional: ko.observable(true), selected: ko.observable(true) },
    { command: 'cosh', action: 'Math.cosh(__param__)', optional: ko.observable(true), selected: ko.observable(false) },
    { command: 'tan', action: 'Math.tan(__param__)', optional: ko.observable(true), selected: ko.observable(true) },
    { command: 'tanh', action: 'Math.tanh(__param__)', optional: ko.observable(true), selected: ko.observable(false) },
    { command: 'ln', action: 'Math.log(__param__)', optional: ko.observable(true), selected: ko.observable(false) },
    { command: 'log', action: 'Math.log(__param__) / Math.log(10)', optional: ko.observable(true), selected: ko.observable(false) },
    { command: 'n!', action: 'Math.log(__param__) / Math.log(10)', optional: ko.observable(true), selected: ko.observable(false) },
    ]);

    self.numbers = [
        { val: 7 },
        { val: 8 },
        { val: 9 },
        { val: 4 },
        { val: 5 },
        { val: 6 },
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 0 },
    ];

    self.inputLine = ko.observable('0');
    self.expression = ko.observable('');
    self.showingNewCommands = ko.observable(false);

    self.memory = ko.observable(0);
    self.memoryIndicator = ko.computed(function () {
        return self.memory() != 0 ? "M" : "";
    });

    self.lastCommand = "";
    self.lastAction = '';

    self.cleanExpression = ko.computed(function () {
        var val = self.expression();
        while (val != "" && val.indexOf("Math") > -1) {
            val = val.replace("Math.", "");
        }
        return val;
    });

    self.memoryCommand = function (e) {
        if (!self.inputLine()) { return; }
        switch (e.action) {
            case "MS":
                self.memory(Number(self.inputLine()));
                break;
            case "MPlus":
                self.memory(eval(Number(self.memory()) +Number( self.inputLine())));
                break;
            case "M-":
                self.memory(eval(Number(self.memory()) - Number(self.inputLine())));
                break;
            case "MC":
                self.memory(0);
                break;
            case "MR":
                self.inputLine(self.memory());
                break;
        };
        self.lastAction = "memory";
    };

    self.clearLast = function (e) {
        var ans = self.inputLine();
        if (ans != "") {
            ans = ans.substr(0, ans.length - 1);
            self.inputLine(ans);
        }
    };

    self.clearEntry = function (e) {
        self.inputLine('0');
        self.lastAction = "";
    };

    self.clearAnswer = function (e) {
        self.inputLine('0');
        self.expression('');
        self.lastAction = "";
        self.lastCommand = "";
    };

    self.hideNewCommands = function (obj, event) {
     //   var elem = $(event.target);
     var className= event.target.className;
       var showIt = 
        (className=='showNewCommands' || className.indexOf("optionalCommand") > 0)
        && className!='closeButton';
       ; // (elem.hasClass("showNewCommands") || elem.parents(".newCommands").length > 0) && !elem.hasClass("closeButton");
        self.showingNewCommands(showIt);
    };

    self.selectCommand = function (e) {
        e.selected(!e.selected());
    }

    self.showNewCommands = function () {
        self.showingNewCommands(true);
    };

    self.addDecimal = function () {
        if (self.lastAction == "number" || !self.inputLine()) {
            self.inputLine(self.inputLine() + ".");
            self.lastAction = '.';
        }
    }

    self.addNumber = function (e) {
        if (this.val == 0 && self.inputLine() == '0') {
            return;
        }
        if (self.lastAction != "number" && self.lastAction != ".") {
            self.inputLine("");
        }

        if (self.inputLine() == "0") {
            self.inputLine("");
        }
        self.inputLine(self.inputLine() + this.val.toString());

        self.lastAction = "number";
    };

    self.addCommand = function (e) {
        if (self.lastAction != "number" && self.lastAction != "action" && self.lastAction != "calculate") {
            return; // invalid
        }

        if (e.action && self.inputLine()) {
            var newCommand = e.action.replace('__param__', self.inputLine());
            self.inputLine(eval(newCommand));
            self.expression(self.expression() + newCommand);
            self.lastAction = "action";
        }
        else if (!e.action) {
            var newValue = null;
            if (self.lastAction == "action") {
                self.expression(self.expression() + e.command);
            }
            else {
                newValue = eval(self.expression() + self.inputLine());
                self.expression(self.expression() + self.inputLine() + e.command);
            }

            if (self.lastAction != "action") {
                self.inputLine(newValue);
            }

            self.lastCommand = e.command;
            self.lastAction = e.command;
        }
    };

    self.calculate = function (e) {
        if (self.expression()) {
            self.lastCommand += self.inputLine();
            self.inputLine(eval(self.expression() + self.inputLine()));
            self.expression("");
        }
        else {
            self.inputLine(eval(self.inputLine() + self.lastCommand));
        }
        self.lastAction = "calculate";
    };

    self.hasNumbers = ko.computed(function () {
        return self.inputLine() == '';
    }, self);
};
    
    ko.applyBindings(new CalculatorModel);

};


