//Item Controller module
const ItemCtrl = (function(){

    //Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    
        //State
        const state = {
            items: [
                {name: "Steak Dinner", calories: 1200},
                {name: "Cookies", calories: 800},
                {name: "Fufu", calories: 500},
                {name: "Sushi", calories: 800}
            ],
            currentItem: null,
            totalCalories = 0
        }

    return{
        logData: function(){
            return state;
        }
    }
});


//UI Controller (Module)
const UICtrl = (function(){
   
});


//App Controller (Module)
const App = (function(itemCtrl, uiCtrl){

    return{
        init: function(){
            console.log("Initializing App")
        }
    }
})(ItemCtrl, UICtrl);

App.init();