import "./Form.css";
import React, { useRef, useCallback, useState } from "react";

const Form = () => {
  const [id, setId] = useState(7);
  const enteredTitleRef = useRef();
  const enteredOpeningTextRef = useRef();
  const enteredDateRef = useRef();

  

  const formSubmitHandler = useCallback((e) => {
    e.preventDefault();
    setId((prev) => prev + 1);
    const formData = {
      id: id,
      title: enteredTitleRef.current.value,
      releaseDate: enteredDateRef.current.value,
      openingText: enteredOpeningTextRef.current.value,
    };
    console.log(formData);
    enteredTitleRef.current.value='';
    enteredDateRef.current.value='';
    enteredOpeningTextRef.current.value='';
  }, [id]);

  return (
    <form action="#" className="form" onSubmit={formSubmitHandler}>
      <div className="input title">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" ref={enteredTitleRef} />
      </div>

      <div className="input opening-text">
        <label htmlFor="">Opening Text</label>
        <textarea
          name="opening-text"
          id="opening-text"
          cols="5"
          rows="5"
          ref={enteredOpeningTextRef}
        />
      </div>

      <div className="input date">
        <label htmlFor="date">Release Date</label>
        <input type="date" name="date" id="date" ref={enteredDateRef} />
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default React.memo(Form);
