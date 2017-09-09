var app = (function (window, $) {
  var $todoInput;
  var $todoBtn;
  var $todoList;
  var $todoDelBtn;
  var controller = window.location.pathname.split('/')[1];

  var saveTodo = function (e) {
    var todo = $('#todo-input').val();

    var opts = {
        url: '/' + controller + '/todo',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ description: todo }),
        success: function (data) {
          var $todo = $('<li>', { id: data._id, text: data.description });
          $todoList.append($todo);
          $todoInput.val('');
        },
      };

    $.ajax(opts);
  };

  var removeTodos = function (e) {
      var opts = {
          url: '/' + controller + '/todos',
          method: 'DELETE',
          success: function () {
              $todoList.children().remove();
            },
        };

      $.ajax(opts);
    };

  $(document).ready(function () {
    $todoInput = $('#todo-input');
    $todoBtn = $('#todo-btn');
    $todoList = $('#todo-list');
    $todoDelBtn = $('#todo-del-btn');
    $todoBtn.click(saveTodo);
    $todoDelBtn.click(removeTodos);
  });
})(window, jQuery);
