import React, { useState } from "react";

const CalendarPage = () => {

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const [selectedDate, setSelectedDate] =
    useState(null);

  const [notes, setNotes] = useState({});

  const [noteInput, setNoteInput] =
    useState("");

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const monthName =
    currentDate.toLocaleString(
      "default",
      {
        month: "long"
      }
    );

  const firstDay =
    new Date(year, month, 1)
      .getDay();

  const daysInMonth =
    new Date(year, month + 1, 0)
      .getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {

    setCurrentDate(
      new Date(year, month - 1, 1)
    );

  };

  const nextMonth = () => {

    setCurrentDate(
      new Date(year, month + 1, 1)
    );

  };

  const saveNote = () => {

    if (!selectedDate || !noteInput)
      return;

    const key =
      `${year}-${month}-${selectedDate}`;

    setNotes({
      ...notes,
      [key]: noteInput
    });

    setNoteInput("");

  };

  return (

    <div className="min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-5xl font-bold text-gray-800">
            Calendar
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your plans and notes.
          </p>

        </div>

      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* CALENDAR */}
        <div className="xl:col-span-2 bg-[#ece3f3] rounded-[40px] p-10 shadow-sm">

          {/* MONTH */}
          <div className="flex justify-between items-center mb-10">

            <button
              onClick={previousMonth}
              className="bg-white px-5 py-3 rounded-2xl shadow-sm hover:bg-gray-100"
            >
              ←
            </button>

            <div className="text-center">

              <h1 className="text-6xl italic text-black">
                {monthName}
              </h1>

              <p className="text-2xl mt-2">
                {year}
              </p>

            </div>

            <button
              onClick={nextMonth}
              className="bg-white px-5 py-3 rounded-2xl shadow-sm hover:bg-gray-100"
            >
              →
            </button>

          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 gap-4 mb-5">

            {
              ["S","M","T","W","T","F","S"]
              .map((day) => (

                <div
                  key={day}
                  className="text-center font-bold text-xl"
                >
                  {day}
                </div>

              ))
            }

          </div>

          {/* DATES */}
          <div className="grid grid-cols-7 gap-4">

            {days.map((day, index) => {

              const key =
                `${year}-${month}-${day}`;

              const hasNote =
                notes[key];

              return (

                <button
                  key={index}
                  onClick={() =>
                    setSelectedDate(day)
                  }
                  className={`h-20 rounded-2xl text-xl flex flex-col items-center justify-center transition-all ${
                    day === selectedDate
                      ? "bg-white shadow-md"
                      : "hover:bg-white/50"
                  }`}
                >

                  {day}

                  {
                    hasNote && (

                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1"></div>

                    )
                  }

                </button>

              );

            })}

          </div>

        </div>

        {/* NOTES */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm h-fit">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Notes
          </h2>

          {

            selectedDate ? (

              <>

                <div className="bg-[#f5f7fb] rounded-2xl p-4 mb-5">

                  <p className="text-lg font-semibold">

                    {selectedDate} {monthName} {year}

                  </p>

                </div>

                <textarea
                  value={noteInput}
                  onChange={(e) =>
                    setNoteInput(
                      e.target.value
                    )
                  }
                  placeholder="Write note..."
                  className="w-full h-40 bg-[#f5f7fb] rounded-3xl p-5 outline-none resize-none"
                />

                <button
                  onClick={saveNote}
                  className="w-full mt-5 bg-green-600 text-white py-4 rounded-3xl hover:bg-green-700 transition-all"
                >
                  Save Note
                </button>

                <div className="mt-8">

                  <p className="font-semibold text-gray-700 mb-3">
                    Saved Note
                  </p>

                  <div className="bg-[#f5f7fb] rounded-3xl p-5 min-h-[120px]">

                    {
                      notes[
                        `${year}-${month}-${selectedDate}`
                      ] || "No note added."
                    }

                  </div>

                </div>

              </>

            ) : (

              <p className="text-gray-500">
                Select a date to add notes.
              </p>

            )

          }

        </div>

      </div>

    </div>

  );

};

export default CalendarPage;