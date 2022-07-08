import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault(); // prevent submit the data to a page
    if (!text) {
      alert("Task Name Cannot Be Blank.");
      return;
    }

    onAdd({ text, day, reminder });
    setText(""); // clear the text
    setDay("");
    setReminder(false);
  };
  return (
    <form action="" className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="">Task</label>
        <input
          type="text"
          placeholder="Add Task..."
          value={text}
          onChange={(e) => setText(e.target.value)} //e.target.value equal to whatever that is typed in.
        />
      </div>
      <div className="form-control">
        <label htmlFor="">Day {"&"} Time</label>
        <input
          type="text"
          placeholder="Input Day & Time..."
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="">Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input
        type="submit"
        value="Save Task!"
        className="btn btn-block"
        style={{ backgroundColor: "green" }}
      />
    </form>
  );
};

export default AddTask;
