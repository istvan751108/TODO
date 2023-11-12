import React, { useEffect, useState } from "react";
import PageLayout from "./parts/PageLayout";
import { BiTrash, BiEdit } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";

function Homepage() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/todoup")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        const formattedData = data.map((item) => ({
          ...item,
          priority: {
            normal: "Normál",
            urgent: "Sürgős",
            extraUrgent: "Extra sürgős",
          }[item.priority],
        }));
        setTodoList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todoup/` + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Sikertelen törlés");
      }

      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== id)
      );

      const responseData = await response.json();
      if (responseData.message) {
        alert(responseData.message);
      }
      console.log("Sikeres törlés");
    } catch (error) {
      alert("Hiba történt a törlés közben.");
      console.error("Hiba törlés közben:", error.message);
    }
  };

  const handleEdit = (id) => {
    // ...
  };

  return (
    <PageLayout title={"Teendők listája:"}>
    <div><b><u>Jelmagyarázat:</u></b></div>
    <div className="col-12 mb-3">
        <div className="d-flex align-items-center">
          <BsCircleFill size={20} color="green" className="mr-2" />
          <span>Normál tevékenység</span>
        </div>
        <div className="d-flex align-items-center">
          <BsCircleFill size={20} color="yellow" className="mr-2" />
          <span>Sürgős tevékenység</span>
        </div>
        <div className="d-flex align-items-center">
          <BsCircleFill size={20} color="red" className="mr-2" />
          <span>Extra sürgős tevékenység</span>
        </div>
      </div>
      <div><b><u>Aktuális teendők listája:</u></b></div>
      <div className="col-12">
        <ul>
          {todoList.map((todo, index) => (
            <li
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <BsCircleFill
                size={20}
                color={getPriorityColor(todo.priority)}
                className="mr-2"
              />
              <div style={{ fontSize: "1.2rem", lineHeight: "2.5" }}>
                {todo.name} - {todo.priority} - {todo.date} - {todo.message}
              </div>
              <div>
                <button
                  className="btn btn-danger rounded-circle mx-1"
                  onClick={() => handleDelete(todo.id)}
                >
                  <BiTrash />
                </button>
                <button
                  className="btn btn-primary rounded-circle mx-1"
                  onClick={() => handleEdit(todo.id)}
                >
                  <BiEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "Normál":
      return "green";
    case "Sürgős":
      return "yellow";
    case "Extra sürgős":
      return "red";
    default:
      return "black";
  }
};

export default Homepage;
