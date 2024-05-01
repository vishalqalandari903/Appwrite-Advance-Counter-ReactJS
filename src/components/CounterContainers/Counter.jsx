import { useRef, useState } from "react";
import { counterStyles } from "../../styles";
import { useDispatch } from "react-redux";
import {
  increamentCount,
  decreamentCount,
  resetCount,
  deleteCounter,
} from "../../app/slices/counter";
import counterService from "../../appwrite/counter";

import { Copy, FolderPen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots } from "@tabler/icons-react";

export const Counter = ({ counter, id, count, name, slug }) => {
  const dispatch = useDispatch();
  const [counterName, setCounterName] = useState(name);
  const [counterInput, setCounterInput] = useState(name);
  const [isNameEditable, setisNameEditable] = useState(false);

  const inputRef = useRef(null);

  const actionButtons = [
    {
      id: 3,
      name: "increament",
      action: () => {
        counterService.updateValue(slug, count + 1).then(() => {
          dispatch(increamentCount({ id }));
        });
      },
      className: `increament ${counterStyles.backgroundButton}`,
      icon: <i className="fa-solid fa-plus"></i>,
    },
    {
      id: 1,
      name: "decreament",
      action: () => {
        counterService.updateValue(slug, count - 1).then(() => {
          dispatch(decreamentCount({ id }));
        });
      },
      className: `decreament ${counterStyles.backgroundButton} `,
      icon: <i className="fa-solid fa-minus"></i>,
    },
    {
      id: 2,
      name: "reset",
      action: () => {
        console.log(counter);
        counterService.updateValue(slug, counter.resetValue).then(() => {
          dispatch(resetCount({ id }));
        });
      },
      className: `reset ${counterStyles.borderButton}`,
      icon: <i className="fa fa-refresh" aria-hidden="true"></i>,
    },
  ];
  actionButtons.sort((a, b) => a.id - b.id);

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

            <div className="absolute right-0 top-0">
              <Dropdown counter={counter} />
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

function Dropdown({ counter }) {
  const dispatch = useDispatch();
  const counterNavigationItems = [
    {
      id: 1,
      label: "Duplicate Counter",
      action: () => {
        console.log("duplicate counter");
      },
      icon: <Copy className="mr-2 h-4 w-4" />,
      shortcut: "⇧⌘P",
    },
    {
      id: 2,
      label: "Edit Counter",
      action: () => {
        console.log("edit counter");
      },
      icon: <FolderPen className="mr-2 h-4 w-4" />,
      shortcut: "⇧⌘P",
    },
    {
      id: 3,
      label: "Delete Counter",
      action: () => {
        counterService.deleteCounter(counter.slug).then(() => {
          dispatch(deleteCounter({ id: counter.$id }));
        });
      },
      icon: <Trash className="mr-2 h-4 w-4" />,
      shortcut: "⇧⌘P",
    },
  ];
  counterNavigationItems.sort((a, b) => a.id - b.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-full p-0 text-2xl px-1 rounded-none rounded-tr-md dark:bg-background dark:border-transparent transition-none"
        >
          {/* <BsThreeDots /> */}
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Counter</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        {counterNavigationItems.map((item, index) => (
          <DropdownMenuItem
            className="cursor-pointer pr-5"
            onClick={item.action}
            key={index}
          >
            <span>{item.label}</span>
            {/* <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
