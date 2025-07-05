import { v4 as uuidv4 } from "uuid";

export default function reduce(nowCards, action) {
  switch (action.type) {
    case "added": {
      let newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        subTitle: "",
        isCompleted: false,
      };
      const newOne = [...nowCards, newTodo];
      localStorage.setItem("newGoal", JSON.stringify(newOne));
      return newOne;
    }
    case "deleted": {
      let edited = nowCards.filter((ele) => ele.id !== action.payload.id);
      localStorage.setItem("newGoal", JSON.stringify(edited));
      return edited;
    }
    case "edit": {
      const edit = nowCards.map((todo) => {
        if (todo.id === action.payload.list.id) {
          return {
            ...todo,
            title: action.payload.list.title,
            subTitle: action.payload.list.details,
          };
        } else {
          return todo;
        }
      });
      localStorage.setItem("newGoal", JSON.stringify(edit));
      return edit;
    }
    case "get": {
      let newList = JSON.parse(localStorage.getItem("newGoal")) ?? [];
      return newList;
    }
    case "checked": {
      const updatedOne = nowCards.map((card) => {
        if (card.id === action.payload) {
          return { ...card, isCompleted: !card.isCompleted };
        }
        return card;
      });
      localStorage.setItem("newGoal", JSON.stringify(updatedOne));
      return updatedOne;
    }
    default: {
      throw Error("What is this action ?");
    }
  }
}
