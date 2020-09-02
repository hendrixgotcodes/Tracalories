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
    getTotalCalories: function () {
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

      state.currentItem = newFoodItem;

      //Adding new food item to food items
      state.items.push(newFoodItem);

      let totalCalories = 0;
      state.items.forEach(food => {
        totalCalories += food.calories;
      });
      state.totalCalories = totalCalories;

      return state.items;
    },
    logData: function () {
      return state;
    },
    getCurrentItem: function () {
      return state.currentItem;
    },
  };
})();

//Data Controller
const DATActrl = (function () {
  function grepItem() {
    return JSON.parse(localStorage.getItem("items"));
  }

  return {
    // Returning public functions

    setItem: function (item) {
      let fromLocalStorage = grepItem();

      if (fromLocalStorage !== null) {
        fromLocalStorage.push(item);
        fromLocalStorage = JSON.stringify(fromLocalStorage);

        localStorage.setItem("items", fromLocalStorage);
      } else if (fromLocalStorage === null) {
        fromLocalStorage = [];
        fromLocalStorage.push(item);

        fromLocalStorage = JSON.stringify(fromLocalStorage);

        localStorage.setItem("items", fromLocalStorage);
      }
    },

    getItem: () => grepItem(),
  };
})();

//UI Controller (Module)
const UICtrl = (function (itemCtrl, DATActrl) {
  const UISelectors = {
    itemList: "item-list",
    btn_add: "btn-add",
    btn_update: "btn-update",
    btn_delete: "btn-delete",
    btn_back: "btn-back",
    input_ItemName: "item-name",
    input_ItemCalories: "item-calories",
    span_TotalCalories: "total-calories",
  };

  //Appending Event Listeners
  function loadEventListeners() {
    //Appending event listener to "+ Add Meal" button
    document
      .getElementById(UISelectors.btn_add)
      .addEventListener("click", itemAddSubmit);

    //Adding event listener to item-list

    document.querySelector("body").addEventListener("click", e => {
      if (e.target.className === "collection-item") {
      }
    });
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

    //Getting Item which was last saved
    let currentItem = itemCtrl.getCurrentItem();
    // Saving item
    DATActrl.setItem(currentItem);
  }

  //Function to how food items in UI
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

    document.getElementById(
      UISelectors.span_TotalCalories
    ).innerText = totalCalories;
  };

  //Function to remove update, delete and back btns
  function rmBtns() {
    document.getElementById(UISelectors.btn_update).style.display = "none";
    document.getElementById(UISelectors.btn_delete).style.display = "none";
    document.getElementById(UISelectors.btn_back).style.display = "none";
  }

  return {
    populateItemList: populateItemList,
    rmvBtns: rmBtns,

    //Returning Selectors
    // UISelectors: ()=> UISelectors,

    //Calling Event listeners
    appendEventListeners: () => loadEventListeners(),

    //Function to set all items in storage
    initItems: () => {
      const storageItems = DATActrl.getItem();

      if (storageItems !== null) {

        let innerHtml = "";

        storageItems.forEach(item => {
          innerHtml += `<li class="collection-item" id="item-${item.id}">
                      <strong>${item.name}: </strong><em>${item.calories}</em>
                      <a href="" class="secondary-content">
                          <i class="edit-item fa fa-pencil"></i>
                      </a>
                  </li>`;
        });

        document.getElementById(UISelectors.itemList).innerHTML = innerHtml;
      }
    },
  };
})(ItemCtrl, DATActrl);

//App Controller (Module)
const App = (function (itemCtrl, uiCtrl) {
  return {
    init: function () {
      //Calling Function to append event listeners
      uiCtrl.appendEventListeners();

      const items = itemCtrl.getItems();

      uiCtrl.populateItemList(items);

      uiCtrl.rmvBtns();

      uiCtrl.initItems();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
