var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoo_db'
});
 
connection.connect(function(err) {
  if (err){
    console.log('err connection ' +err.stack);
  return;
  };
});
 
var prompt = require('prompt');
prompt.start();
prompt.message= "";


var zoo = {
  welcome : function(){
    console.log("Welcome to the Zoo and Friends App~!")
  },
  menu : function(){
    console.log("Enter (A):-----> to Add a new animal to the Zoo!" + "\r\n" +
                    "Enter (U):-----> to Update info on an new animal in the Zoo!" + "\r\n" +
                    "Enter (V):-----> to Visit the animals in the Zoo!" + "\r\n" +
                    "Enter (D):-----> to Adopt an animals from the Zoo!" + "\r\n" + "\r\n" +
                    "Enter (Q):-----> to Quit and exit the Zoo!" + "\r\n")
  },
  
  add : function(input_scope){
    var currentScope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(["name", "type", "age"], function(err, result){
      connection.query("INSERT INTO animals SET ?"(result.name, result.type, result.age)"), 
      currentScope.menu();
      currentScope.promptUser();
    });
  },

  visit : function(input_scope){
    var currentScope = input_scope;
    console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!" + "\r\n" +
              "Enter (N): ------> do you know the animal by it's name? We will visit that animal!" + "\r\n" +
              "Enter (A): ------> here's the count for all animals in all locations!" + "\r\n" +
              "Enter (C): ------> here's the count for all animals in this one city!" + "\r\n" +
              "Enter (O): ------> here's the count for all the animals in all locations by the type you specified!" + "\r\n" + "\r\n" +
              "Enter (Q): ------> Quits to the main menu!)"),
    currentScope.visit();
    currentScope.view(currentScope);
  },

  view : function(){
    var currentScope = input_scope;
    console.log("Please choose what you like to visit");
    prompt.get(["visit"], function(err, result){
      if (result.visit ==="Q"){
        currentScope.menu();
      }else if (result.visit === "O"){
        currentScope.type(input_scope);
      }else if (result.type === "I"){
        currentScope.type(input_scope);
      }else if (result.animID === "N"){
        currentScope.name(input_scope);
      }else if (result.name === "A"){
        currentScope.all(input_scope);
      }else if (result.all === "c"){
        currentScope.care(input_scope);
      }else{
        console.log("Sorry didn't get that, come again?");
        currentScope.visit();
        currentScope.view(currentScope);
      };
    });
  },

  type : function(input_scope){
    var currentScope = input_scope;
    console.log("Enter animal type to find how many animals we have of that type.");
    prompt.get(["animal_type"], function(err, result){
      connection.query("SELECT COUNT(*) FROM animals WHERE result.animal_type");  
      currentScope.menu();
      currentScope.promptUser();
    });
   
  },

  care : function(input_scope){
    var currentScope = input_scope;
    console.log("Enter city name NY/SF");
    prompt.get("city_name", function(err, result){
      connection.query("SELECT COUNT(*) FROM animals WHERE city_name ='result.city_name'"); // HELP
      currentScope.visit();
      currentScope.view(currentScope);  
    });
  },

  animId : function(input_scope){
    var currentScope = input_scope;
    console.log("Enter ID of the animal you want to visit");
    prompt.get("animal_id", function(err, result){
      connection.query("SELECT * FROM animals WHERE animal_id = 'result.animal_id'"); 
      currentScope.visit();
      currentScope.view(currentScope);  
    });
  },

  name : function(input_scope){
    var currentScope = input_scope;
    console.log("Enter name of the animal you want to visit");
    prompt.get("animal_name", function(err, result){
      connection.query("SELECT * FROM animals WHERE animal_name ='result.animal_name'"); // NEED HELP
      currentScope.visit();
      currentScope.view(currentScope);  
    });
  },

  all : function(input_scope){
    var currentScope = input_scope;
    prompt.get([""], function(err, result){
      connection.query("SELECT COUNT(*) FROM animals");
      currentScope.menu();
      currentScope.promptUser();
    });
  },

  update : function(input_scope){
    var currentScope = input_scope;
      prompt.get(["id","new_name","new_age", "new_type","new_caretaker_id"], function(err, result){
        connection.query("INSERT INTO animals (id, name, age, type, care_take_id) VALUE (result.id, result.new_name, result.new_type, result.new_caretaker_id)");
        currentScope.menu();
        currentScope.promptUser();
      });
  },

  adopt : function(input_scope){
    var currentScope = input_scope;
    prompt.get(["animal_id"], function(err, result){
      connection.query("DELETE FROM animal WHERE animal_id='result.animal_id'");
      currentScope.visit();
      currentScope.view(currentScope); 
    })
  },

  promptUser : function(){
    var self = this;
    prompt.get("input", function(err, result){
      if (result.input === "Q"){
        self.exit();
      }else if (result.input ==="A"){
        self.add(self);
      }else if(result.input === "V"){
        self.visit();
      }else if(result.input === "D"){
        self.adopt(self);
      }else{
        console.log("Sorry I didn\'t get that, come again?");
      }
    })
  },

  exit : function(){
    console.log("Thank you for visiting us, goodbye~!");
    process.exit();
  },

  open : function(){
    this.welcome();
    this.menu();
    this.promptUser();
  }

} // END ZOO OBJECT

zoo.open();




