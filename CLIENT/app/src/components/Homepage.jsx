import React, { useEffect, useState } from "react";
import PageLayout from "./parts/PageLayout";

function Homepage() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/todoup")
        .then(response => response.json())
        .then(data => {
            console.log("Received data:", data);
            const formattedData = data.map(item => ({
              ...item,
              priority: {
                  normal: "Normál",
                  urgent: "Sürgős",
                  extraUrgent: "Extra sürgős"
              }[item.priority]
          }));
            setTodoList(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}, []);

  return (
    <PageLayout title={"Aktuális teendők listája:"}>
      <div className="col-12">
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              {todo.name} - {todo.priority} - {todo.date} - {todo.message}
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}

export default Homepage;
