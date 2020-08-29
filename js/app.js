"use strict";

//Item Controller module
const ItemCtrl = (function () {
  //Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //State
  const state = {
    items: [],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    // PUBLIC FUNCTIONS

    // function to return food items
    getItems: function () {
      return state.items;
    },
    getTotalCalories: function(){
        return state.totalCalories;
    },
    //function to add food items to list
    addItems: function (name, calories) {
      let ID;

      //   If item list is empty
      if (state.items.length > 0) {
        ID = state.items[state.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      let newFoodItem = {
        id: ID,
        name: name,
        calories: parseInt(calories),
      };

      //Adding new food item to food items
      state.items.push(newFoodItem);

      let totalCalories = 0;
      state.items.forEach((food)=>{
            totalCalories += food.calories;
      });
      state.totalCalories = totalCalories;


      return state.items;
    },
    logData: function () {
      return state;
    },
  };
})();

//UI Controller (Module)
const UICtrl = (function (itemCtrl) {
  const UISelectors = {
    itemList: "item-list",
    btn_add: "btn-add",
    input_ItemName: "item-name",
    input_ItemCalories: "item-calories",
    span_TotalCalories: "total-calories",
  };

  //Appending Event Listeners
  function loadEventListeners() {
    document
      .getElementById(UISelectors.btn_add)
      .addEventListener("click", itemAddSubmit);
  }

  //Function called on btn eventlistener
  function itemAddSubmit(e) {

    e.preventDefault();
    const input_ItemName = document.getElementById(UISelectors.input_ItemName);
    const input_ItemCalories = document.getElementById(
      UISelectors.input_ItemCalories
    );

    const Food = input_ItemName.value;
    const Calories = input_ItemCalories.value;

    if (Food !== "" || Calories !== "") {

      populateItemList(itemCtrl.addItems(Food, Calories));

      input_ItemName.value = "";
      input_ItemCalories.value = "";

    }
  }

  let populateItemList = function (items) {
    let innerHtml = "";
    let totalCalories = itemCtrl.getTotalCalories();

    items.forEach(item => {
      innerHtml += `<li class="collection-item" id="item-${item.id}">
              <strong>${item.name}: </strong><em>${item.calories}</em>
              <a href="" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
              </a>
          </li>`;
    });

    document.getElementById(UISelectors.itemList).innerHTML = innerHtml;

    document.getElementById(UISelectors.span_TotalCalories).innerText = totalCalories;

  };

  return {
    populateItemList: populateItemList,

    //Returning Selectors
    // UISelectors: ()=> UISelectors,

    //Calling Event listeners
    appendEventListeners: () => loadEventListeners(),
  };
})(ItemCtrl);

//App Controller (Module)
const App = (function (itemCtrl, uiCtrl) {
  return {
    init: function () {
      //Calling Function to append event listeners
      uiCtrl.appendEventListeners();

      const items = itemCtrl.getItems();

      uiCtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

App.init();
