// add hovered class to selected list item
let list = document.querySelectorAll(".studentNavigation li");

function activeLink(){
    list.forEach((item)=> {
        item.classList.remove("studentHovered");
    });
    this.classList.add("studentHovered")
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

//menu toggle
let toggle = document.querySelector(".studentToggle");
let navigation = document.querySelector(".studentNavigation");
let main = document.querySelector(".studentMain");

toggle.onclick = function(){
    navigation.classList.toggle("studentActive");
    main.classList.toggle("studentActive");
};
(function($) {
    'use strict';
    $(function() {
      var todoListItem = $('.todo-list');
      var todoListInput = $('.todo-list-input');
      $('.todo-list-add-btn').on("click", function(event) {
        event.preventDefault();
  
        var item = $(this).prevAll('.todo-list-input').val();
  
        if (item) {
          todoListItem.append("<li><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i></li>");
          todoListInput.val("");
        }
  
      });
  
      todoListItem.on('change', '.checkbox', function() {
        if ($(this).attr('checked')) {
          $(this).removeAttr('checked');
        } else {
          $(this).attr('checked', 'checked');
        }
  
        $(this).closest("li").toggleClass('completed');
  
      });
  
      todoListItem.on('click', '.remove', function() {
        $(this).parent().remove();
      });
  
    });
  })(jQuery);
