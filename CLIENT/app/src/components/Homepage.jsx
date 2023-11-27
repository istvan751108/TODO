import React, { useEffect, useState } from "react";
import PageLayout from "./parts/PageLayout";
import { BiTrash, BiEdit } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import EditTodoModal from "./parts/EditTodoModal";
import TodoUpModal from "./parts/TodoUpModal";

function Homepage() {
  const [todoList, setTodoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTodoUpModal, setShowTodoUpModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

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
      const confirmDelete = window.confirm(
        "Biztosan törölni szeretnéd ezt a teendőt?"
      );

      if (!confirmDelete) {
        return;
      }

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

  const setFormData = (todo) => {
    setData({
      name: todo.name,
      priority: todo.priority,
      date: todo.date,
      message: todo.message,
    });
  };

  useEffect(() => {
    if (selectedTodo) {
      setFormData(selectedTodo);
    }
  }, [selectedTodo]);

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setFormData(todo);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleTodoUpModalOpen = () => {
    setShowTodoUpModal(true);
  };

  const handleTodoUpModalClose = () => {
    setShowTodoUpModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/todoup");

        if (!response.ok) {
          throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
        }

        const data = await response.json();
        const formattedData = data.map((item) => ({
          ...item,
          priority: {
            normal: "Normál",
            urgent: "Sürgős",
            extraUrgent: "Extra sürgős",
          }[item.priority],
        }));

        setTodoList(data);
      } catch (error) {
        console.error("Hiba történt a kérés során:", error.message);
      }
    };

    const handleTodoUpModalClose = async () => {
      setShowTodoUpModal(false);
      await fetchData(); // Frissítsük az adatokat az ablak bezárása után
    };

    if (!showTodoUpModal) {
      fetchData();
    }
  }, [showTodoUpModal]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/todoup/${selectedTodo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Sikertelen módosítás");
      }

      setSuccess(true);
      setErrors(initialErrors);
      handleModalClose();

      location.reload();
    } catch (error) {
      const responseData = await error.json();
      console.log(responseData);
      setErrors(responseData.errors);
      setSuccess(false);
    }
  };

  const Error = ({ collection, index }) =>
    collection[index] && collection[index].length > 0 ? (
      <span className="text-danger">{collection[index][0]}</span>
    ) : (
      ""
    );

  return (
    <PageLayout title={"Teendők listája:"}>
      <div>
        <b>
          <u>Jelmagyarázat:</u>
        </b>
      </div>
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
      <div className="d-flex justify-content-between">
        <b>
          <u>Aktuális teendők listája:</u>
        </b>
        <button className="btn btn-primary" onClick={handleTodoUpModalOpen}>
          Új Teendő Felvitele
        </button>
      </div>
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
                  onClick={() => handleEdit(todo)}
                >
                  <BiEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <EditTodoModal
        show={showModal}
        handleClose={handleModalClose}
        data={data}
        handleChange={handleChange}
        errors={errors}
        handleSave={handleSave}
        options={options}
      />
      <TodoUpModal
        show={showTodoUpModal}
        handleClose={handleTodoUpModalClose}
      />
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
