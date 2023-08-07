import "./Form.css";
import React, { useRef, useCallback, useContext } from "react";
import MovieContext from "../../store/MovieContext";

const Form = (props) => {
  const movieCtx = useContext(MovieContext);

  const enteredTitleRef = useRef();
  const enteredOpeningTextRef = useRef();
  const enteredDateRef = useRef();

  const formSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = {
        title: enteredTitleRef.current.value,
        releaseDate: enteredDateRef.current.value,
        openingText: enteredOpeningTextRef.current.value,
      };

      // making a POST request
      try {
        const responsePost = await fetch(
          "https://used-react-fetch-default-rtdb.firebaseio.com/movies.json",
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!responsePost.ok) throw new Error("Something went wrong");
        props.onAddMovie();
        enteredTitleRef.current.value = "";
        enteredDateRef.current.value = "";
        enteredOpeningTextRef.current.value = "";
      } catch (error) {
        movieCtx.errorHelper(error.message);
      }
    },
    [movieCtx, props]
  );

  return (
    <form action="#" className="form" onSubmit={formSubmitHandler}>
      <div className="input title">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          ref={enteredTitleRef}
          required
        />
      </div>

      <div className="input opening-text">
        <label htmlFor="">Opening Text</label>
        <textarea
          name="opening-text"
          id="opening-text"
          cols="5"
          rows="5"
          ref={enteredOpeningTextRef}
          minLength={10}
          maxLength={200}
          required
        />
      </div>

      <div className="input date">
        <label htmlFor="date">Release Date</label>
        <input
          type="date"
          name="date"
          id="date"
          ref={enteredDateRef}
          required
        />
      </div>

      <button type="submit" className="add-movie">
        Add Movie
      </button>
    </form>
  );
};

export default React.memo(Form);
