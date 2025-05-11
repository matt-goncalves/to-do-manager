export class Task {
  #title : string;
  #taskId : string;
  #description: string;
  #creationDate: string;
  #status: "open" | "complete";

  constructor(
    taskObject : TaskObject
  ) {
    this.#title = taskObject.title;
    this.#taskId = taskObject.taskId;
    this.#description = taskObject.description;
    this.#creationDate = taskObject.creationDate;
    this.#status = taskObject.status;
  }

  complete() {
    this.#status = "complete";
  }

  reopen() {
    this.#status = "open";
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getCreationDate() {
    return this.#creationDate;
  }

  getStatus() {
    return this.#status;
  }

  getTaskId() {
    return this.#taskId;
  }

  setTitle( newTitle : string ) {
    this.#title = newTitle;
  }

  setDescription( newDescription : string ) {
    this.#description = newDescription;
  }
}

export type TaskObject = {
  title : string ,
  taskId : string ,
  description : string ,
  creationDate : string ,
  status : "open" | "complete"
};
