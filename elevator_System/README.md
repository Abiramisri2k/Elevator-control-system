# 🚀 Elevator Control System

A simple **Elevator Control System Simulation** built with **React** to understand how multiple elevators work in a real building.

This project simulates **3 elevators** serving **8 floors**. Users can call an elevator from any floor or choose a destination inside the elevator. The system automatically selects the most suitable elevator and moves it floor by floor.

---

## ✨ Features

* 🏢 3 Elevators and 8 Floors
* ⬆️ Hall Call (Up / Down buttons)
* 🔢 Car Call (Floor selection inside elevator)
* 🚪 Automatic door open and close
* 📍 Real-time elevator movement
* 🔄 Tick-based simulation
* 📊 Live dashboard

  * Pending Calls
  * Moving Elevators
* 🔁 Reset Simulation
* ▶️ Run Demo

---

## ⚙️ How It Works

### 1. Hall Call

When a user presses the **Up** or **Down** button on a floor, the system:

* Receives the request
* Finds the best elevator
* Assigns the request
* Moves the elevator to that floor

---

### 2. Car Call

Once inside the elevator, the passenger selects a destination floor.

The selected floor is added to the elevator's queue and the elevator continues serving requests.

---

### 3. Elevator Movement

Instead of jumping directly to a floor, each elevator moves **one floor at a time**.

Every **650 milliseconds**, the simulation updates:

* Elevator position
* Door status
* Direction
* Pending requests

This creates smooth and realistic movement.

---

## 🧠 Algorithms Used

### LOOK Scheduling Algorithm

The elevator continues moving in its current direction until there are no more requests in that direction. Only then does it reverse.

Example:

Floor 2 → Floor 5 → Floor 8 → Reverse → Floor 4 → Floor 1

This reduces unnecessary direction changes.

---

### Greedy Scheduling

When a hall call is made, every elevator is scored based on:

* Distance from the requested floor
* Current direction

The elevator with the **lowest score** is assigned to the request.

---

### Tick-Based Simulation

The system updates every **650ms**.

Each update (tick):

* Moves elevators
* Opens or closes doors
* Checks completed requests
* Updates the UI

---

## 🏗️ Project Structure

```text
src/
│
├── components/
│   ├── FloorCallPanel.jsx
│   ├── Shaft.jsx
│   └── CarInfoPanel.jsx
│
├── algorithms/
│   ├── scheduler.js
│   ├── movement.js
│   └── elevatorFactory.js
│
├── reducer/
│   ├── elevatorReducer.js
│   └── initialState.js
│
├── constants/
│   └── elevatorConstants.js
│
└── App.jsx
```

---

## 🛠️ Technologies Used

* React
* JavaScript (ES6+)
* useReducer
* CSS / Tailwind CSS

---

## 📚 What I Learned

While building this project, I learned:

* Breaking a real-world problem into smaller parts
* Managing complex state using `useReducer`
* Implementing scheduling algorithms
* Applying the Single Responsibility Principle (SRP)
* Building reusable React components
* Organizing project structure for better maintainability

---

## 🎯 Why I Built This

I wanted to build something beyond a basic CRUD application and learn how real systems work.

This project helped me understand concepts commonly discussed in **Low-Level Design (LLD)** interviews, such as scheduling, state management, and system design.

---

## ⭐ If you found this project helpful

Feel free to star the repository or share your feedback. Suggestions and improvements are always welcome!