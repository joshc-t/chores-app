type Action = {};
type Task = {};
type Search = {};

class ChoresEngine {
  constructor(events: Action[]) {
    for (var event of events) {
      this.addEvent(event);
    }
  }
  addEvent = (event: Action) => {};
  getTasks: (search: Search) => Task[] = (search: Search) => {
    return [];
  };
}
