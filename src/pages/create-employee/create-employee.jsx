import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/reducer.js";
import Form from "../../components/form/form.jsx";

const CreateEmployee = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(addEmployee(data));
    onClose();
  };
  return <Form onSubmit={handleSubmit}></Form>;
};

export default CreateEmployee;
