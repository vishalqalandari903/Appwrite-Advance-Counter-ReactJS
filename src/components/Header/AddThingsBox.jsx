import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";

import { Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AddThingsBox = () => {
  return (
    <>
      <Dropdown />
    </>
  );
};

const Dropdown = () => {
  const navigate = useNavigate();

  //   const dropdownItems = [
  //     {
  //       label: "New Counter",
  //       iconClassname: "",
  //     },
  //   ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between items-center border border-button_border min-w-10 px-2 py-2 gap-1 text-md rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 cursor-pointer text-slate-500 dark:text-slate-200">
          <FiPlus />
          <MdArrowDropDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(e) => navigate("/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Counter</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
