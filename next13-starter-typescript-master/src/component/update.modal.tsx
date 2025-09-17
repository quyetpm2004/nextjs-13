import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (v: boolean) => void;
  updateBlog: IBlog;
}

function UpdateModal(props: IProps) {
  const { showModalUpdate, setShowModalUpdate, updateBlog } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (updateBlog) {
      setTitle(updateBlog.title ?? "");
      setAuthor(updateBlog.author ?? "");
      setContent(updateBlog.content ?? "");
    }
  }, [updateBlog]);

  const handleSubmit = () => {
    if (!title || !author || !content) {
      toast.warning("Please fill all fields");
      return;
    }
    fetch(`http://localhost:8000/blogs/${updateBlog.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Update blog successfully");
          mutate("http://localhost:8000/blogs");
        }
      });
    handleClose();
  };

  const handleClose = () => {
    setShowModalUpdate(false);
    setTitle("");
    setAuthor("");
    setContent("");
  };

  return (
    <>
      <Modal size="lg" show={showModalUpdate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
