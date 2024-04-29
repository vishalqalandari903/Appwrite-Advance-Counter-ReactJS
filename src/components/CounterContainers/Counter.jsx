import { useRef, useState } from "react";
import { counterStyles } from "../../styles";
import { useDispatch } from "react-redux";
import {
  increamentCount,
  decreamentCount,
  resetCount,
  deleteCounter,
  duplicateCounter,
} from "../../app/slices/counter";

import { databases } from "../../appwrite/appwriteConfig";
export const Counter = ({ id, count, name, index }) => {
  const [counterName, setCounterName] = useState(name);
  const [counterInput, setCounterInput] = useState(name);
  const [isNameEditable, setisNameEditable] = useState(false);
  const [isNavigationActive, setIsNavigationActive] = useState(false);
  const dispatch = useDispatch();

  const [counter, setCounter] = useState("");

  const inputRef = useRef(null);

  const actionButtons = [
    {
      id: 3,
      name: "increament",
      action: () => dispatch(increamentCount({ id: id })),
      className: `increament ${counterStyles.backgroundButton}`,
      icon: <i className="fa-solid fa-plus"></i>,
    },
    {
      id: 1,
      name: "decreament",
      action: () => dispatch(decreamentCount({ id: id })),
      className: `decreament ${counterStyles.backgroundButton} `,
      icon: <i className="fa-solid fa-minus"></i>,
    },
    {
      id: 2,
      name: "reset",
      action: () => dispatch(resetCount({ id: id })),
      className: `reset ${counterStyles.borderButton}`,
      icon: <i className="fa fa-refresh" aria-hidden="true"></i>,
    },
  ];
  actionButtons.sort((a, b) => a.id - b.id);
  // console.log(id);

  const deleteCounter = () => {
    const promise = databases.deleteDocument(
      "661f34bbb5d1a230d246",
      "661f351331712a69aa84",
      id
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const counterNavigationItems = [
    {
      id: 1,
      label: "Github Repository",
      action: () =>
        window.open(
          "https://github.com/vishalqalandari903/Counter-using-ReactJS",
          "_blank"
        ),
    },
    {
      id: 2,
      label: "Duplicate Counter",
      action: () => dispatch(duplicateCounter({ id: id })),
    },
    {
      id: 3,
      label: "Rename Counter",
      action: () => {
        setisNameEditable(true);
        inputRef.current.focus();
      },
    },
    {
      id: 4,
      label: "Delete Counter",
      action: () => deleteCounter(),
    },
  ];
  counterNavigationItems.sort((a, b) => a.id - b.id);

  const changeCounterName = (e) => {
    if (e.key) {
      if (e.key == "Enter" && document.activeElement == inputRef.current) {
        if (inputRef.current.value != "") {
          inputRef.current.blur();
        } else {
          setCounterInput(counterName);
        }
      }

      e.key == "Enter" &&
        document.activeElement == inputRef.current &&
        inputRef.current.value != "" &&
        inputRef.current.blur();
    } else {
      if (e.target.value != "") {
        setisNameEditable(false);
        setCounterName(counterInput);
      } else {
        setCounterInput(counterName);
      }
    }
  };
  document.addEventListener("keyup", changeCounterName);

  return (
    <>
      <div className="relative min-[550px]:w-auto w-fit">
        <div
          className={`counter_container bg-gray-50 border border-gray-300 dark:border-transparent dark:bg-background_primary px-10 rounded-md flex items-center flex-col gap-2 shadow-lg relative pb-5`}
        >
          <header className="text-base w-full flex justify-center items-center">
            <input
              className="title mt-1 text-ellipsis w-1/2 text-nowrap overflow-hidden cursor-text bg-transparent outline-none border border-transparent hover:border-gray-600 hover:border-opacity-40 focus:border-gray-400 text-center px-1"
              value={counterInput}
              onChange={(e) => setCounterInput(e.target.value)}
              onBlur={(e) => {
                changeCounterName(e);
              }}
              readOnly={!isNameEditable}
              onClick={(e) => setisNameEditable(true)}
              title={counterName}
              ref={inputRef}
            />

            <div className="absolute right-0 top-0 justify-self-end card-img_hover">
              <div
                className="text-black dark:text-white rounded-tr-md px-2 hover:bg-slate-500 dark:hover:bg-slate-700 hover:bg-opacity-20 cursor-pointer relative text-xl"
                onClick={() => setIsNavigationActive(!isNavigationActive)}
              >
                {isNavigationActive ? (
                  <i className="fa-solid fa-xmark"></i>
                ) : (
                  <i className="fa-solid fa-ellipsis"></i>
                )}
              </div>
              <ul
                className={`absolute right-2 top-7 text-nowrap bg-slate-50 rounded-md overflow-hidden ${
                  isNavigationActive ? "block" : "hidden"
                } shadow-lg max-w-40 border-gray-400 border-opacity-70 border p-2`}
              >
                {counterNavigationItems.map((counterNavigationItem) => (
                  <li
                    className="px-2 py-1 cursor-pointer text-sm hover:bg-gray-300 hover:bg-opacity-25 overflow-hidden text-ellipsis rounded-md text-black"
                    title={counterNavigationItem.label}
                    key={counterNavigationItem.id}
                    onClick={() => {
                      counterNavigationItem.action();
                      setIsNavigationActive(false);
                    }}
                    target="_blank"
                  >
                    {counterNavigationItem.label}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <h1 className={`counter ${counterStyles.counterText}`}>{count}</h1>
          <div className="actions flex gap-4 justify-center  text-center py-3 text-xl">
            {actionButtons.map((actionButton) => (
              <button
                key={actionButton.name}
                className={`${actionButton.className} px-4`}
                onClick={actionButton.action}
              >
                {actionButton.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
