const todo_list = new Map();
let editing_el = null;

const list_container = document.querySelector('ul');
const add_button = document.querySelector('.theend');
const input_field = document.querySelector("#types");

const list_html_maker = (todo_name) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const input = document.createElement("input");
  const edit_button = document.createElement("button");
  const delete_button = document.createElement("button");
  const display_div = document.createElement("div");
  const action_div = document.createElement("div");

  // add properties and classes
  li.className = "list";
  input.type = "checkbox";
  input.name = todo_name;
  p.innerHTML = todo_name;
  delete_button.innerHTML = "&ndash;";
  delete_button.className = "edit_button";
  edit_button.className = "edit_button";
  edit_button.innerHTML = "Edit";

  // add listeners to the edit and delete buttons
  delete_button.addEventListener("click", _ => {
    const list_cont = delete_button.parentElement.parentElement;
    const p_value = list_cont.querySelector("p").innerHTML;
    todo_list.delete(p_value);
    list_cont.remove();
  });

  edit_button.addEventListener("click", _ => {
    const list_cont = edit_button.parentElement.parentElement;
    editing_el = list_cont.querySelector("p");
    input_field.value = editing_el.innerHTML;
    add_button.innerHTML = add_button.innerHTML.replace("Add Todo", "Update Todo");
  });

  // add event listener to the checkbox input
  input.addEventListener("change", e => {
    const is_checked = e.target.checked;
    const p_el = e.target.nextElementSibling;
    is_checked
      ? (p_el.className = "complete")
      : (p_el.className = "");
  });

  // link the DOM elements
  display_div.insertAdjacentElement("beforeend", input);
  display_div.insertAdjacentElement("beforeend", p);
  action_div.insertAdjacentElement("beforeend", edit_button);
  action_div.insertAdjacentElement("beforeend", delete_button);
  li.insertAdjacentElement("beforeend", display_div);
  li.insertAdjacentElement("beforeend", action_div);
  return li;
};

const add_new_todo = (todo_name) => {
  const list = todo_list.get(todo_name);
  if(list) return alert("Can't have duplicate to do list");

  todo_list.set(todo_name, { todo_name });
  const li = list_html_maker(todo_name);
  list_container.insertAdjacentElement("beforeend", li);
};

add_button.addEventListener("click", _ => {
  const todo_input = input_field.value.trim();
  if(todo_input !== "" && !editing_el) {
    add_new_todo(todo_input);
    input_field.value = "";
  }
  
  if(todo_input !== "" && editing_el) {
    const oldVal = editing_el.innerHTML;
    if(oldVal !== todo_input) {
      todo_list.delete(oldVal);
      todo_list.set(todo_input, { todo_input });
      editing_el.innerHTML = todo_input;
    }

    add_button.innerHTML = add_button.innerHTML.replace("Update Todo", "Add Todo");
    input_field.value = "";
    editing_el = null;
  }
});
