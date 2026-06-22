import CreateCabinForm from "./CreateCabinForm.jsx";
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  // Old implementation before compound component pattern
  // const [isOpenModal, setIsOpenModal] = useState(false);
  //
  // return (
  //   <div>
  //     <Button onClick={() => setIsOpenModal((show) => !show)}>
  //       Add new cabin
  //     </Button>
  //     {isOpenModal && (
  //       <Modal onClose={() => setIsOpenModal((show) => !show)}>
  //         <CreateCabinForm
  //           onCloseModal={() => setIsOpenModal((show) => !show)}
  //         />
  //       </Modal>
  //     )}
  //   </div>
  // );
}

export default AddCabin;
