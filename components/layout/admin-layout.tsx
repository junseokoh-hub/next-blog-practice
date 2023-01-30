import React from "react";
import AdminNav from "../common/admin-nav";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFile,
} from "react-icons/ai";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const navItems = [
  { href: "/admin", icon: AiOutlineDashboard, label: "Dashboard" },
  { href: "/admin/posts", icon: AiOutlineContainer, label: "Posts" },
  { href: "/admin/users", icon: AiOutlineTeam, label: "Users" },
  { href: "/admin/comments", icon: AiOutlineMail, label: "Comments" },
  { href: "/admin/contact", icon: AiOutlineContacts, label: "Contact" },
];

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <AdminNav navItems={navItems} />
      <div className="p-4 flex-1">{children}</div>
      <Link
        href="/admin/create"
        className="p-3 fixed right-10 bottom-10 z-10 rounded-full text-primary dark:text-primary-dark bg-secondary-dark dark:bg-secondary-light hover:scale-90 shadow-sm transition"
      >
        <AiOutlineFile />
      </Link>
    </div>
  );
};

export default AdminLayout;
