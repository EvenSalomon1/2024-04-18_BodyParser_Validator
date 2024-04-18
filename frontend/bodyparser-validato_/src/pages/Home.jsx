import { useEffect, useState } from "react";

const Home = () => {
  // *alle States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [allEntries, setAllEntries] = useState([]);

  //   !Fetch, um mir die Daten zu holen, die ich ins Backend an den Server schicke, um die dann ggf. in mein HTML zu schreiben
  useEffect(() => {
    fetch("http://localhost:4004/api/v1/entries")
      .then((res) => res.json())
      .then((data) => setAllEntries(data))
      .catch((err) => console.log(err));
  }, []);

  //   !Funktion um neue Entries hinzuzufügen (also POST One)
  const addNewEntry = (e) => {
    e.preventDefault();

    //* variable for entry-input-values
    const newEntry = {
      firstName,
      lastName,
      email,
      message,
    };

    //* Fetch für POST One

    fetch("http://localhost:4004/api/v1/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllEntries(data);
        // Damit nachdem auf "Send"-Button geklickt wird die Eingabefelder wieder geleert werden
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* hier ist einfach nur die Form mit onChange was in den jeweiligen States gespeichert wird */}
      <form>
        <input
          type="text"
          name=""
          id=""
          placeholder="Vorname"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Nachname"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          type="email"
          name=""
          id=""
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Nachricht"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <button onClick={addNewEntry}>Send</button>
      </form>
      {/* hier ist die Section, in die die Daten, die im Backend gespeichert werden, ausgegeben werden */}
      <section>
        {allEntries.map((item, index) => (
          <div key={index}>
            <p>{item.firstName}</p>
            <p>{item.lastName}</p>
            <p>{item.email}</p>
            <p>{item.message}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
