import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPlane } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    return (
        <nav className="flex justify-between bg-nav p-4">
            <div className="flex items-center space-x-4">
                {/* <Link href="/">
                    <FontAwesomeIcon icon={faHome} className="icon" />
                </Link> */}
                <Link href="/events/">
                    <FontAwesomeIcon icon={faCalendarDays} className="icon" />
                </Link>
                <Link href="/aircrafts/">
                    <FontAwesomeIcon icon={faPlane} className="icon" />
                </Link>
            </div>
            <div>
                <p className="text-default-text">zhang.m@nyu.edu</p>
            </div>
        </nav>
    );
};

export default Nav;
