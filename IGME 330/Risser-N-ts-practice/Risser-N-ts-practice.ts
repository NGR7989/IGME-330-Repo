// START CODE & Instructions

/*
  #1 - Create an interface that describes the structure of the item objects in the `todoItems` array
  Then strongly type the `todoItems` array
*/
interface TodoItem {
    id: number;
    title: string;
    status: "todo" | "in-progress" | "done";
    completedOn: string;
  }
  
  
  /*
    #2 - Strongly type the `status` property with an enum
    Note the `status` values below: "done", "in-progess" etc
  */  
  enum Status{
    "done",
    "in-progress",
    "todo"
  }
  
  /*
    #3 - Strongly type the parameters and return values of `addTodoItem()` and `getNextId()`
  */
  
  function addTodoItem(todo: string, todoItems: TodoItem[]): TodoItem {
      const id = getNextId(todoItems);
  
      const newTodo:TodoItem = {
          id,
          title: todo,
          status: "todo",
          completedOn: "NA"
      };
  
      todoItems.push(newTodo);
  
      return newTodo;
  }
  
  function getNextId(items: TodoItem[]): number {
      return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1;
  }
  
  // **When you are done, there must not be any errors under the Playground's "Errors" tab**
  const names:string[] = new Array("Mary","Tom","Jack","Jill")  
  
  const todoItems:TodoItem[] = new Array(
      { id: 1, title: "Learn HTML", status: "done", completedOn: new Date("2021-09-11").toString() },
      { id: 2, title: "Learn TypeScript", status: "in-progress", completedOn: "NA"},
      { id: 3, title: "Write the best web app in the world", status: "todo", completedOn: "NA" },
  );
  
  const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app", todoItems)
  console.log(JSON.stringify(newTodo))