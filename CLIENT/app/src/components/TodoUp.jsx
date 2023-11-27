import React, { useEffect, useState } from "react";
import Input, { Textarea } from "./parts/Input";

const TodoUp = ({ onSuccess }) => {
  const initialData = { name: "", priority: "", date: "", message: "" };
  const [data, setData] = useState(initialData);
  const initialErrors = initialData;
  const [errors, setErrors] = useState(initialErrors);
  const [success, setSuccess] = useState(false);

  const [options, setOptions] = useState([
    { label: "", value: "" },
    { label: "Normál", value: "normal" },
    { label: "Sürgős", value: "urgent" },
    { label: "Extra sürgős", value: "extraUrgent" },
  ]);

  const handleChange = (e) => {
    if (data.priority === "") {
      setOptions([{ label: "", value: "" }, ...options.slice(1)]);
    }

    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/todoup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw response;
        else return response.json();
      })
      .then(() => {
        onSuccess();
      })
      .catch(async (response) => {
        const err = await response.json();
        console.log(err);
        setErrors(err.errors);
        setSuccess(false);
      });
  };

  const Error = ({ collection, index }) =>
    collection[index] && collection[index].length > 0 ? (
      <span className="text-danger">{collection[index][0]}</span>
    ) : (
      ""
    );

  return (
    <div>
      {success && (
        <div className="alert alert-success my-3">Sikeres felvitel!</div>
      )}
      <form action="" method="post" onSubmit={handleSubmit} className="row g-3">
        <div className="col-12 col-lg-6">
          <Input
            name={"name"}
            label="Add meg a feladat nevét!"
            onChange={handleChange}
          />
          <Error collection={errors} index="name" />
        </div>

        <div className="col-12 col-lg-6">
          <Input
            name={"priority"}
            label="Add meg a feladat priorítását!"
            onChange={handleChange}
            type="select"
            options={options}
            value={data.priority}
          />
          <Error collection={errors} index="priority" />
        </div>

        <div className="col-12 col-lg-6">
          <Input
            name={"date"}
            type="date"
            label="Add meg a feladat határidejét"
            onChange={handleChange}
          />
          <Error collection={errors} index="date" />
        </div>

        <div className="col-12">
          <Textarea
            name={"message"}
            label="Add meg a feladat leírását"
            onChange={handleChange}
          />
          <Error collection={errors} index="message" />
        </div>

        <div className="col-12 text-center">
          <button className="btn btn-success">Rögzítés</button>
        </div>
      </form>
    </div>
  );
};

export default TodoUp;