"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useState } from "react";
import CreateModal from "./create.modal";
import UpdateModal from "./update.modal";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  blogs: IBlog[];
}

const AppTable = (props: IProps) => {
  const { blogs } = props;

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [updateBlog, setUpdateBlog] = useState<IBlog>({} as IBlog);

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure to delete blog has id = ${id}?`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res) {
          toast.success("Delete blog successfully");
          mutate("http://localhost:8000/blogs");
        }
      });
    }
  };

  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h4>Table Blogs</h4>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <Link href={`/blogs/${blog.id}`} className="btn-primary btn">
                  View
                </Link>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => {
                    setUpdateBlog(blog);
                    setShowModalUpdate(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(blog.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        updateBlog={updateBlog}
      />
    </>
  );
};

export default AppTable;
